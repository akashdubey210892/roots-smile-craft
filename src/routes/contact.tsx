import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { addDoc, collection, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { CheckCircle2, Mail, MapPin, MessageCircle, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageHero, Reveal } from "@/components/clinic";
import { GoogleReviewsTeaser } from "@/components/site-extras";
import { clinic } from "@/lib/clinic-data";
import { db } from "@/lib/firebase";
import { addDaysIso, formatSlotLabel, nowMinutes, todayIso } from "@/lib/slots";
import { computeAvailableSlotsForDate, useDoctors, type DoctorProfile } from "@/lib/doctors";

const MAX_LOOKAHEAD_DAYS = 14;
const CLINIC_MAP_URL = "https://www.google.com/maps/place/Roots+Dental+Clinic/@13.1927079,77.4955784,9.78z/data=!4m6!3m5!1s0x3bae19cf0c69c9df:0x5157dd968efe4981!8m2!3d13.1429128!4d77.5693407!16s%2Fg%2F11zxr_x29p?entry=ttu&g_ep=EgoyMDI2MDkyMS4wIKXMDSoASAFQAw%3D%3D";
const CLINIC_MAP_EMBED_URL = "https://www.google.com/maps?q=13.1429128,77.5693407&output=embed";

async function dateHasOpenSlot(
  dateIso: string,
  doctorKey: string,
  isTodayDate: boolean,
  allDoctors: DoctorProfile[],
): Promise<boolean> {
  const snap = await getDocs(collection(db, "slots", dateIso, "doctors", doctorKey, "booked"));
  const availableSlots = computeAvailableSlotsForDate(doctorKey, dateIso, allDoctors);
  const booked = new Set(snap.docs.map((d) => d.id));
  const nowMins = nowMinutes();
  return availableSlots.some((time) => {
    if (booked.has(time)) return false;
    if (isTodayDate) {
      const mins = Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));
      if (mins <= nowMins) return false;
    }
    return true;
  });
}

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100).regex(/^[A-Za-z][A-Za-z .'-]*$/, "Name should contain letters only"),
  phone: z.string().trim().regex(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().trim().email("Enter a valid email address").max(255),
  service: z.string().trim().min(2, "Tell us the reason for your visit").max(120),
  message: z.string().trim().max(600),
});
const searchSchema = z.object({ doctor: z.string().optional() });

export const Route = createFileRoute("/contact")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Contact & Appointments | ROOTS Dental Yelahanka" },
      { name: "description", content: "Request a dental appointment at ROOTS DENTAL CLINIC, Singanayakanahalli, Yelahanka. Call 8009537637." },
      { property: "og:title", content: "Contact ROOTS DENTAL CLINIC" },
      { property: "og:description", content: "Request an appointment or get directions to our Yelahanka dental clinic." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function isPermissionDenied(err: unknown): boolean {
  return typeof err === "object" && err !== null && "code" in err && (err as { code?: string }).code === "permission-denied";
}

type Sent = { date: string; time: string; doctorKey: string };

function Contact() {
  const { doctors, loading: loadingDoctors } = useDoctors();
  const { doctor: doctorParam } = Route.useSearch();
  function doctorLabel(doctorKey: string) {
    if (doctorKey === "any") return "Any Available Doctor";
    return doctors.find((d) => d.id === doctorKey)?.name ?? doctorKey;
  }
  const [doctorKey, setDoctorKey] = useState(doctorParam ?? "any");
  useEffect(() => {
    if (loadingDoctors) return;
    if (doctorParam && doctors.some((d) => d.id === doctorParam)) setDoctorKey(doctorParam);
    else setDoctorKey("any");
  }, [doctorParam, doctors, loadingDoctors]);
  const [date, setDate] = useState(todayIso());
  const [minDate, setMinDate] = useState(todayIso());
  const [findingDate, setFindingDate] = useState(true);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookedTimes, setBookedTimes] = useState<Set<string>>(new Set());
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [slotsBlocked, setSlotsBlocked] = useState(false);
  useEffect(() => {
    if (loadingDoctors) return;
    let cancelled = false;
    setFindingDate(true);
    (async () => {
      const start = todayIso();
      try {
        if (await dateHasOpenSlot(start, doctorKey, true, doctors)) { if (!cancelled) setMinDate(start); return; }
        const nextMin = addDaysIso(start, 1);
        if (!cancelled) setMinDate(nextMin);
        for (let i = 1; i <= MAX_LOOKAHEAD_DAYS; i++) {
          const candidate = addDaysIso(start, i);
          if (await dateHasOpenSlot(candidate, doctorKey, false, doctors)) { if (!cancelled) setDate(candidate); return; }
          if (cancelled) return;
        }
        if (!cancelled) setDate(nextMin);
      } catch {} finally { if (!cancelled) setFindingDate(false); }
    })();
    return () => { cancelled = true; };
  }, [doctorKey, doctors, loadingDoctors]);
  function refreshBookedTimes() {
    return getDocs(collection(db, "slots", date, "doctors", doctorKey, "booked")).then((snap) => setBookedTimes(new Set(snap.docs.map((d) => d.id)))).catch(() => setBookedTimes(new Set()));
  }
  useEffect(() => {
    if (loadingDoctors) return;
    let cancelled = false;
    setLoadingSlots(true); setSelectedTime(null); setSlotsBlocked(false);
    getDocs(collection(db, "slots", date, "doctors", doctorKey, "booked"))
      .then((snap) => { if (cancelled) return; setBookedTimes(new Set(snap.docs.map((d) => d.id))); setAvailableSlots(computeAvailableSlotsForDate(doctorKey, date, doctors)); })
      .catch((err) => { if (!cancelled) { setBookedTimes(new Set()); setAvailableSlots([]); if (isPermissionDenied(err)) setSlotsBlocked(true); } })
      .finally(() => { if (!cancelled) setLoadingSlots(false); });
    return () => { cancelled = true; };
  }, [date, doctorKey, doctors, loadingDoctors]);
  const isToday = date === todayIso();
  const minutesNow = nowMinutes();
  const slots = availableSlots.map((time) => { const totalMinutes = Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5)); const isPast = isToday && totalMinutes <= minutesNow; return { time, available: !bookedTimes.has(time) && !isPast }; });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState<Sent | null>(null);
  useEffect(() => { if (sent) document.getElementById("appointment-form")?.scrollIntoView({ behavior: "smooth", block: "start" }); }, [sent]);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setFormError(null);
    const result = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    const nextErrors: Record<string, string> = result.success ? {} : Object.fromEntries(result.error.issues.map((x) => [String(x.path[0]), x.message]));
    if (!date) nextErrors["date"] = "Please select a date";
    else if (date < minDate) nextErrors["date"] = date < todayIso() ? "Past dates cannot be selected" : "No slots remain today — please choose another date";
    if (!selectedTime) nextErrors["time"] = "Please choose an available time slot";
    else if (date === todayIso()) {
      const selectedMinutes = Number(selectedTime.slice(0, 2)) * 60 + Number(selectedTime.slice(3, 5));
      if (selectedMinutes <= nowMinutes()) { nextErrors["time"] = "This time has already passed — please choose another slot"; setSelectedTime(null); }
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || !result.success || !selectedTime) return;
    setSubmitting(true); const data = result.data;
    try { await setDoc(doc(db, "slots", date, "doctors", doctorKey, "booked", selectedTime), { bookedAt: serverTimestamp() }); }
    catch (err) { setFormError(isPermissionDenied(err) ? "Online booking isn't set up yet — please call us to book this slot." : "That slot was just booked by someone else. Please choose another time."); setSubmitting(false); refreshBookedTimes(); return; }
    try { await addDoc(collection(db, "appointments"), { name: data.name, phone: data.phone, email: data.email, doctor: doctorKey, date, time: selectedTime, service: data.service, message: data.message, createdAt: serverTimestamp() }); }
    catch (err) { setFormError(isPermissionDenied(err) ? "Online booking isn't set up yet — please call us to book this slot." : "Your slot was reserved, but we couldn't save your details. Please call us to confirm."); setSubmitting(false); return; }
    try { await addDoc(collection(db, "appointmentEmails"), { type: "confirmation", to: data.email, name: data.name, doctor: doctorKey, date, time: selectedTime, service: data.service, createdAt: serverTimestamp() }); } catch {}
    setSent({ date, time: selectedTime, doctorKey }); setSubmitting(false); e.currentTarget.reset();
  }
  return (
    <main>
      <PageHero eyebrow="Contact us" title="Let's care for your smile" text="Request a consultation, call our clinic, or find us in Singanayakanahalli, Yelahanka." />
      <section className="section">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.7fr_1.3fr] lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-foreground">ROOTS DENTAL CLINIC</h2>
            <address className="mt-5 leading-7 text-muted-foreground not-italic">{clinic.address}</address>
            <div className="mt-8 grid gap-3"><a className="contact-link" href={`tel:${clinic.phone}`}><Phone />{clinic.phone}</a><a className="contact-link" href={`mailto:${clinic.email}`}><Mail />{clinic.email}</a></div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="hero"><a href={CLINIC_MAP_URL} target="_blank" rel="noreferrer"><MapPin />Get Directions</a></Button>
              <Button asChild variant="outline"><a href={clinic.whatsapp} target="_blank" rel="noreferrer"><MessageCircle />WhatsApp Us</a></Button>
            </div>
            <div className="mt-10 overflow-hidden rounded-3xl border shadow-soft">
              <iframe title="ROOTS Dental Clinic location in Yelahanka" src={CLINIC_MAP_EMBED_URL} loading="lazy" className="h-80 w-full border-0" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </Reveal>
          <div id="appointment-form" className="relative scroll-mt-24 overflow-hidden rounded-3xl border bg-card p-6 shadow-premium sm:p-10">
            <Sparkles aria-hidden="true" className="animate-float pointer-events-none absolute right-6 top-6 size-8 text-sunny" />
            <p className="eyebrow">Appointment request</p><h2 className="mt-3 font-display text-3xl text-foreground">Request an Appointment</h2>
            {sent ? (
              <div role="status" className="mt-8 rounded-3xl bg-accent p-6"><CheckCircle2 className="size-8 text-primary" /><h3 className="mt-4 font-display text-xl text-foreground">Your slot is reserved</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{new Date(sent.date + "T00:00:00").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })} at {formatSlotLabel(sent.time)} with {doctorLabel(sent.doctorKey)}. Our team will call to confirm your visit.</p><Button size="lg" className="mt-5" onClick={() => setSent(null)}>Book another appointment</Button></div>
            ) : (
              <form className="mt-7 grid gap-5" onSubmit={submit} noValidate>
                <div className="grid gap-5 sm:grid-cols-2"><Field label="Full Name" name="name" error={errors["name"]} /><Field label="Phone Number" name="phone" type="tel" inputMode="numeric" maxLength={10} error={errors["phone"]} /></div>
                <Field label="Email" name="email" type="email" error={errors["email"]} />
                <label className="grid gap-2 text-sm font-semibold text-foreground">Preferred Doctor<select value={doctorKey} onChange={(e) => setDoctorKey(e.target.value)} className="field"><option value="any">Any Doctor</option>{doctors.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}</select></label>
                <label className="grid gap-2 text-sm font-semibold text-foreground">Preferred Date<input type="date" value={date} min={minDate} onChange={(e) => setDate(e.target.value < minDate ? minDate : e.target.value)} aria-invalid={!!errors["date"]} className="field" />{minDate > todayIso() && <span className="text-xs font-normal text-muted-foreground">No remaining slots today. Showing the next available date.</span>}{errors["date"] && <span className="text-xs font-normal text-destructive">{errors["date"]}</span>}</label>
                <div className="grid gap-2"><span className="text-sm font-semibold text-foreground">Available Times</span>{findingDate || loadingSlots ? <p className="rounded-2xl bg-muted p-4 text-sm text-muted-foreground">Checking availability…</p> : slots.length === 0 ? <p className="rounded-2xl bg-muted p-4 text-sm text-muted-foreground">No slots are available for this date. Please choose another date.</p> : <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{slots.map(({ time, available }) => <button key={time} type="button" disabled={!available || slotsBlocked} onClick={() => { if (available) { setSelectedTime(time); setErrors((prev) => ({ ...prev, time: "" })); } }} className={`rounded-2xl border px-3 py-3 text-sm font-semibold transition ${selectedTime === time ? "border-primary bg-primary text-primary-foreground" : available ? "border-border bg-background hover:border-primary" : "cursor-not-allowed border-border bg-muted text-muted-foreground line-through"}`}>{formatSlotLabel(time)}</button>)}</div>}{errors["time"] && <span className="text-xs text-destructive">{errors["time"]}</span>}</div>
                <label className="grid gap-2 text-sm font-semibold text-foreground">Reason for Visit<Field label="Reason for Visit" name="service" error={errors["service"]} /></label>
                <label className="grid gap-2 text-sm font-semibold text-foreground">Message (optional)<Textarea name="message" placeholder="Anything else you'd like us to know?" /></label>
                {formError && <p role="alert" className="rounded-2xl bg-destructive/10 p-4 text-sm text-destructive">{formError}</p>}
                <Button size="lg" variant="hero" type="submit" disabled={submitting}>{submitting ? "Reserving your slot…" : "Request Appointment"}</Button>
                <p className="text-xs leading-5 text-muted-foreground">By submitting, you agree that our team may contact you about your appointment request.</p>
              </form>
            )}
          </div>
        </div>
      </section>
      <GoogleReviewsTeaser />
    </main>
  );
}

function Field({ label, name, type = "text", inputMode, maxLength, error }: { label: string; name: string; type?: string; inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"]; maxLength?: number; error?: string }) {
  return <label className="grid gap-2 text-sm font-semibold text-foreground">{label}<Input name={name} type={type} inputMode={inputMode} maxLength={maxLength} aria-invalid={!!error} />{error && <span className="text-xs font-normal text-destructive">{error}</span>}</label>;
}
