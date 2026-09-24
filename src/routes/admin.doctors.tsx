import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ImagePlus, Pencil, Plus, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { services } from "@/lib/clinic-data";
import { DAY_KEYS, type DayKey } from "@/lib/slots";
import {
  createDoctorProfile,
  deleteDoctorProfile,
  doctorInitials,
  emptyAvailability,
  updateDoctorProfile,
  useDoctors,
  validateDoctorDetails,
  validateDoctorPhoto,
  type DayAvailability,
  type DoctorDetails,
  type DoctorProfile,
  type TimeRange,
} from "@/lib/doctors";

export const Route = createFileRoute("/admin/doctors")({
  component: AdminDoctors,
});

const DAY_LABELS: Record<DayKey, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

function AdminDoctors() {
  const { doctors, loading, addLocal, updateLocal, removeLocal } = useDoctors();
  const [mode, setMode] = useState<"list" | "form">("list");
  const [editing, setEditing] = useState<DoctorProfile | null>(null);
  const [status, setStatus] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [pendingDelete, setPendingDelete] = useState<DoctorProfile | null>(null);
  const [deleting, setDeleting] = useState(false);

  function openAdd() {
    setEditing(null);
    setStatus(null);
    setMode("form");
  }

  function openEdit(doctor: DoctorProfile) {
    setEditing(doctor);
    setStatus(null);
    setMode("form");
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    setStatus(null);
    try {
      await deleteDoctorProfile(pendingDelete);
      removeLocal(pendingDelete.id);
      setStatus({ kind: "ok", text: `${pendingDelete.name} has been removed.` });
    } catch {
      setStatus({ kind: "error", text: "Couldn't delete this profile. Please try again." });
    } finally {
      setDeleting(false);
      setPendingDelete(null);
    }
  }

  if (mode === "form") {
    return (
      <DoctorForm
        doctor={editing}
        onCancel={() => setMode("list")}
        onSaved={(doctor, isNew) => {
          if (isNew) addLocal(doctor);
          else updateLocal(doctor);
          setMode("list");
          setStatus({ kind: "ok", text: isNew ? `${doctor.name} added.` : `${doctor.name} updated.` });
        }}
      />
    );
  }

  return (
    <div>
      <h2 className="font-display text-2xl text-foreground">Doctors</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Manage each doctor's profile — photo, experience, qualifications, services offered and
        weekly availability. These are exactly what patients see on the website and can book
        against.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button size="lg" onClick={openAdd}>
          <Plus className="size-4" />
          Add Doctor
        </Button>
        {status && (
          <p
            className={`text-sm ${status.kind === "error" ? "text-destructive" : "text-muted-foreground"}`}
            role="status"
          >
            {status.text}
          </p>
        )}
      </div>

      {loading ? (
        <p className="mt-8 text-sm text-muted-foreground">Loading doctors…</p>
      ) : doctors.length === 0 ? (
        <p className="mt-8 rounded-lg border border-dashed border-border bg-background p-8 text-center text-sm text-muted-foreground">
          No doctors yet. The doctors page is hidden on the website until you add one.
        </p>
      ) : (
        <ul className="mt-8 grid gap-4">
          {doctors.map((d) => (
            <li
              key={d.id}
              className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-background p-3 shadow-sm"
            >
              {d.photo ? (
                <img
                  src={d.photo.url}
                  alt=""
                  className="size-16 shrink-0 rounded-full bg-muted object-cover"
                />
              ) : (
                <span className="grid size-16 shrink-0 place-items-center rounded-full bg-accent font-display text-lg font-bold text-primary">
                  {doctorInitials(d.name)}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold text-foreground">{d.name}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {d.yearsOfExperience}+ years · {d.qualification}
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {d.services.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-1">
                <Button type="button" variant="outline" size="sm" onClick={() => openEdit(d)}>
                  <Pencil className="size-4" />
                  Edit
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => setPendingDelete(d)}>
                  <Trash2 className="size-4" />
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <AlertDialog
        open={pendingDelete !== null}
        onOpenChange={(open) => {
          if (!open && !deleting) setPendingDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {pendingDelete?.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes their profile from the website and clears their availability. Existing
              appointments already booked with them are not affected. This can't be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={deleting}
              onClick={(e) => {
                e.preventDefault();
                confirmDelete();
              }}
            >
              {deleting ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Add / edit form — profile details + weekly availability in one place
// ---------------------------------------------------------------------------

function DoctorForm({
  doctor,
  onCancel,
  onSaved,
}: {
  doctor: DoctorProfile | null;
  onCancel: () => void;
  onSaved: (doctor: DoctorProfile, isNew: boolean) => void;
}) {
  const isNew = doctor === null;
  const fileInput = useRef<HTMLInputElement>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(doctor?.photo?.url ?? null);
  const [name, setName] = useState(doctor?.name ?? "");
  const [yearsOfExperience, setYearsOfExperience] = useState(
    doctor ? String(doctor.yearsOfExperience) : "",
  );
  const [qualification, setQualification] = useState(doctor?.qualification ?? "");
  const [selectedServices, setSelectedServices] = useState<string[]>(doctor?.services ?? []);
  const [newService, setNewService] = useState("");
  const [availability, setAvailability] = useState<DayAvailability>(
    doctor?.availability ?? emptyAvailability(),
  );
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const customServices = selectedServices.filter(
    (selected) => !services.some((service) => service.title === selected),
  );

  useEffect(() => {
    return () => {
      if (photoPreview && photoFile) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview, photoFile]);

  function pickPhoto(file: File | undefined) {
    if (!file) return;
    const problem = validateDoctorPhoto(file);
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  function toggleService(service: string) {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service],
    );
  }

  function addCustomService() {
    const value = newService.trim();
    if (!value) return;

    const exists = selectedServices.some((service) => service.toLowerCase() === value.toLowerCase());
    if (exists) {
      setError("This service is already added to the profile.");
      return;
    }

    setSelectedServices((prev) => [...prev, value]);
    setNewService("");
    setError(null);
  }

  function updateRange(day: DayKey, index: number, patch: Partial<TimeRange>) {
    setAvailability((prev) => ({
      ...prev,
      [day]: prev[day].map((r, i) => (i === index ? { ...r, ...patch } : r)),
    }));
  }

  function addRange(day: DayKey) {
    setAvailability((prev) => ({ ...prev, [day]: [...prev[day], { start: "09:00", end: "13:00" }] }));
  }

  function removeRange(day: DayKey, index: number) {
    setAvailability((prev) => ({ ...prev, [day]: prev[day].filter((_, i) => i !== index) }));
  }

  async function handleSave() {
    const details: DoctorDetails = {
      name,
      yearsOfExperience: Number(yearsOfExperience),
      qualification,
      services: selectedServices,
      availability,
    };
    const problem = validateDoctorDetails(details);
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    setSaving(true);
    try {
      const saved = isNew
        ? await createDoctorProfile(details, photoFile)
        : await updateDoctorProfile(doctor.id, details, photoFile, doctor.photo);
      onSaved(saved, isNew);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't save this profile. Please try again.");
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-lg border-l-4 border-l-primary bg-accent p-5">
        <h2 className="font-display text-2xl text-foreground">
          {isNew ? "Add Doctor" : `Edit ${doctor.name}`}
        </h2>
      </div>

      <div className="mt-6 grid gap-6">
        <section className="grid gap-3">
          <p className="text-sm font-semibold">Photo</p>
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              pickPhoto(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
          <div className="flex items-center gap-4">
            {photoPreview ? (
              <img src={photoPreview} alt="" className="size-24 rounded-full object-cover shadow-sm" />
            ) : (
              <span className="grid size-24 place-items-center rounded-full bg-muted text-muted-foreground">
                <ImagePlus className="size-8" />
              </span>
            )}
            <Button type="button" variant="outline" onClick={() => fileInput.current?.click()}>
              {photoPreview ? "Change photo" : "Add photo"}
            </Button>
          </div>
        </section>

        <label className="grid gap-1.5 text-sm font-semibold">
          Full Name
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Dr Jane Doe" />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1.5 text-sm font-semibold">
            Years of Experience
            <Input
              type="number"
              inputMode="numeric"
              min={0}
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(e.target.value)}
            />
          </label>
          <label className="grid gap-1.5 text-sm font-semibold">
            Qualification
            <Input
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              placeholder="e.g. BDS, MDS (Orthodontics)"
            />
          </label>
        </div>

        <section className="grid gap-2">
          <p className="text-sm font-semibold">
            Services <span className="font-normal text-muted-foreground">(shown on their profile card)</span>
          </p>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addCustomService();
                }
              }}
              placeholder="Add a new service for this profile"
              aria-label="New service"
            />
            <Button
              type="button"
              variant="outline"
              onClick={addCustomService}
              disabled={!newService.trim()}
              className="shrink-0"
            >
              <Plus className="size-4" />
              Add Service
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Add a service that isn't in the standard list. It will be selected for this doctor only.
          </p>

          <div className="grid max-h-64 gap-2 overflow-y-auto rounded-md border border-border p-3 sm:grid-cols-2">
            {services.map((s) => (
              <label key={s.slug} className="flex cursor-pointer items-center gap-2 text-sm">
                <Checkbox
                  checked={selectedServices.includes(s.title)}
                  onCheckedChange={() => toggleService(s.title)}
                />
                {s.title}
              </label>
            ))}

            {customServices.map((service) => (
              <label key={`custom-${service}`} className="flex cursor-pointer items-center gap-2 text-sm">
                <Checkbox checked onCheckedChange={() => toggleService(service)} />
                <span className="min-w-0 truncate">{service}</span>
                <span className="ml-auto shrink-0 rounded-full bg-accent px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-primary">
                  Custom
                </span>
              </label>
            ))}
          </div>
        </section>

        <section className="grid gap-2">
          <p className="text-sm font-semibold">Weekly Availability</p>
          <p className="text-xs text-muted-foreground">
            Add time ranges for each day this doctor is available. A day with no ranges means
            they're unavailable that day. These times control what patients can book online.
          </p>
          <div className="mt-2 grid gap-4">
            {DAY_KEYS.map((day) => (
              <div key={day} className="rounded-lg border border-border bg-background p-4">
                <h3 className="font-display text-sm text-foreground">{DAY_LABELS[day]}</h3>
                <div className="mt-2 grid gap-2">
                  {availability[day].length === 0 && (
                    <p className="text-xs text-muted-foreground">Not available</p>
                  )}
                  {availability[day].map((range, i) => (
                    <div key={i} className="flex flex-wrap items-center gap-2">
                      <input
                        type="time"
                        value={range.start}
                        onChange={(e) => updateRange(day, i, { start: e.target.value })}
                        className="field h-9 w-auto py-0"
                      />
                      <span className="text-xs text-muted-foreground">to</span>
                      <input
                        type="time"
                        value={range.end}
                        onChange={(e) => updateRange(day, i, { end: e.target.value })}
                        className="field h-9 w-auto py-0"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Remove range"
                        onClick={() => removeRange(day, i)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => addRange(day)}
                >
                  <Plus className="size-4" />
                  Add Range
                </Button>
              </div>
            ))}
          </div>
        </section>

        {error && (
          <p className="text-sm font-semibold text-destructive" role="alert">
            {error}
          </p>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Button type="button" variant="ghost" onClick={onCancel} disabled={saving}>
            Cancel
          </Button>
          <Button type="button" size="lg" onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : isNew ? "Add Doctor" : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
