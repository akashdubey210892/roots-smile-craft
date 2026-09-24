import { useCallback, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "./firebase";
import { DAY_KEYS, SLOT_MINUTES, dayKeyForIso, type DayKey } from "./slots";

export type TimeRange = { start: string; end: string };
export type DayAvailability = Record<DayKey, TimeRange[]>;

export type DoctorPhoto = { url: string; path: string };

export type DoctorDetails = {
  name: string;
  yearsOfExperience: number;
  qualification: string;
  services: string[];
  availability: DayAvailability;
};

export type DoctorProfile = DoctorDetails & { id: string; photo: DoctorPhoto | null };

export const DOCTOR_LIMITS = {
  name: 120,
  qualification: 300,
  sourceBytes: 10 * 1024 * 1024,
};

const MAX_WIDTH = 800;
const WEBP_QUALITY = 0.85;

export function emptyAvailability(): DayAvailability {
  return { mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] };
}

function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
}

/** Expand [{start:"09:00",end:"13:00"}] into 15-min slot start times ["09:00","09:15",...]. */
export function expandRangesToSlots(ranges: TimeRange[]): string[] {
  const slots = new Set<string>();
  for (const { start, end } of ranges) {
    const startMin = toMinutes(start);
    const endMin = toMinutes(end);
    for (let m = startMin; m < endMin; m += SLOT_MINUTES) {
      const h = Math.floor(m / 60)
        .toString()
        .padStart(2, "0");
      const mm = (m % 60).toString().padStart(2, "0");
      slots.add(`${h}:${mm}`);
    }
  }
  return Array.from(slots).sort();
}

/** Slot list for one doctor on a given date, straight from their embedded availability. */
export function slotsForDoctorOnDate(doctor: DoctorProfile, dateIso: string): string[] {
  const dayKey = dayKeyForIso(dateIso);
  return expandRangesToSlots(doctor.availability[dayKey] ?? []);
}

/** Fixed clinic-wide slots for the "Any Doctor" booking option. */
export function slotsForAnyDoctorOnDate(_doctors: DoctorProfile[], _dateIso: string): string[] {
  const slots: string[] = [];
  // Generic bookings are available from 10:00 AM through 7:45 PM in 15-minute increments.
  for (let m = 10 * 60; m < 20 * 60; m += SLOT_MINUTES) {
    const h = Math.floor(m / 60).toString().padStart(2, "0");
    const mm = (m % 60).toString().padStart(2, "0");
    slots.push(`${h}:${mm}`);
  }
  return slots;
}

/** Slots for a specific doctor id, or "any", given the currently loaded doctor list. */
export function computeAvailableSlotsForDate(
  doctorId: string,
  dateIso: string,
  doctors: DoctorProfile[],
): string[] {
  if (doctorId === "any") return slotsForAnyDoctorOnDate(doctors, dateIso);
  const doctor = doctors.find((d) => d.id === doctorId);
  return doctor ? slotsForDoctorOnDate(doctor, dateIso) : [];
}

function normalizeAvailability(data: unknown): DayAvailability {
  const result = emptyAvailability();
  if (data && typeof data === "object") {
    for (const day of DAY_KEYS) {
      const ranges = (data as Partial<DayAvailability>)[day];
      if (Array.isArray(ranges)) result[day] = ranges;
    }
  }
  return result;
}

function fromDoc(id: string, data: Record<string, unknown>): DoctorProfile {
  return {
    id,
    name: String(data["name"] ?? ""),
    yearsOfExperience: Number(data["yearsOfExperience"] ?? 0),
    qualification: String(data["qualification"] ?? ""),
    services: Array.isArray(data["services"]) ? (data["services"] as string[]) : [],
    availability: normalizeAvailability(data["availability"]),
    photo:
      data["photo"] && typeof data["photo"] === "object" ? (data["photo"] as DoctorPhoto) : null,
  };
}

export function useDoctors() {
  const [doctors, setDoctors] = useState<DoctorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "doctors"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setDoctors(snap.docs.map((d) => fromDoc(d.id, d.data())));
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("Failed to load doctors", err);
        setLoading(false);
        setError("Couldn't load doctor profiles.");
      },
    );
    return unsubscribe;
  }, []);

  const addLocal = useCallback((doctor: DoctorProfile) => {
    setDoctors((prev) => (prev.some((d) => d.id === doctor.id) ? prev : [...prev, doctor]));
  }, []);
  const updateLocal = useCallback((doctor: DoctorProfile) => {
    setDoctors((prev) => prev.map((d) => (d.id === doctor.id ? doctor : d)));
  }, []);
  const removeLocal = useCallback((id: string) => {
    setDoctors((prev) => prev.filter((d) => d.id !== id));
  }, []);

  return { doctors, loading, error, addLocal, updateLocal, removeLocal };
}

async function compressToWebp(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_WIDTH / bitmap.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/webp", WEBP_QUALITY),
  );
  if (!blob) throw new Error("Couldn't process this image. Try a JPG or PNG.");
  return blob;
}

export function validateDoctorPhoto(file: File): string | null {
  if (!file.type.startsWith("image/")) return "Please choose an image file (JPG, PNG or WebP).";
  if (file.size > DOCTOR_LIMITS.sourceBytes) return "That image is too large. Please choose one under 10 MB.";
  return null;
}

export function validateDoctorDetails(d: DoctorDetails): string | null {
  if (!d.name.trim()) return "Please enter the doctor's name.";
  if (!d.qualification.trim()) return "Please enter a qualification.";
  if (!Number.isFinite(d.yearsOfExperience) || d.yearsOfExperience < 0)
    return "Please enter a valid number of years of experience.";
  if (d.services.length === 0) return "Please select at least one service.";
  return null;
}

async function uploadPhoto(file: File): Promise<DoctorPhoto> {
  const blob = await compressToWebp(file);
  const path = `doctors/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.webp`;
  const fileRef = ref(storage, path);
  await uploadBytes(fileRef, blob, { contentType: "image/webp" });
  return { url: await getDownloadURL(fileRef), path };
}

async function removePhoto(photo: DoctorPhoto | null): Promise<void> {
  if (!photo?.path) return;
  await deleteObject(ref(storage, photo.path)).catch((err) => {
    if (err?.code !== "storage/object-not-found") console.error("Failed to delete doctor photo", err);
  });
}

export async function createDoctorProfile(
  details: DoctorDetails,
  photoFile: File | null,
): Promise<DoctorProfile> {
  const problem = validateDoctorDetails(details);
  if (problem) throw new Error(problem);

  let photo: DoctorPhoto | null = null;
  try {
    if (photoFile) photo = await uploadPhoto(photoFile);
    const docRef = await addDoc(collection(db, "doctors"), {
      ...details,
      name: details.name.trim(),
      qualification: details.qualification.trim(),
      photo,
      createdAt: serverTimestamp(),
    });
    return { ...details, id: docRef.id, photo };
  } catch (err) {
    await removePhoto(photo);
    throw err;
  }
}

export async function updateDoctorProfile(
  id: string,
  details: DoctorDetails,
  photoFile: File | null,
  previousPhoto: DoctorPhoto | null,
): Promise<DoctorProfile> {
  const problem = validateDoctorDetails(details);
  if (problem) throw new Error(problem);

  let photo = previousPhoto;
  let uploadedNew: DoctorPhoto | null = null;
  try {
    if (photoFile) {
      uploadedNew = await uploadPhoto(photoFile);
      photo = uploadedNew;
    }
    await updateDoc(doc(db, "doctors", id), {
      ...details,
      name: details.name.trim(),
      qualification: details.qualification.trim(),
      photo,
    });
    if (uploadedNew && previousPhoto) await removePhoto(previousPhoto);
    return { ...details, id, photo };
  } catch (err) {
    await removePhoto(uploadedNew);
    throw err;
  }
}

export async function deleteDoctorProfile(doctor: DoctorProfile): Promise<void> {
  await deleteDoc(doc(db, "doctors", doctor.id));
  await removePhoto(doctor.photo);
}

export function doctorInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "");
  return letters.join("") || "D";
}
