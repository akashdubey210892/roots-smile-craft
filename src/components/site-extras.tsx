import { Link } from "@tanstack/react-router";
import { Award, CalendarDays, CheckCircle2, GraduationCap, Heart, Sparkles, Star, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/clinic";
import { reviewLinks, type ManagementProfile } from "@/lib/clinic-data";
import { doctorInitials, type DoctorProfile } from "@/lib/doctors";
import { useGoogleReviews } from "@/lib/use-google-reviews";

export function ProfileAvatar({
  photo,
  initials,
  name,
  size = "md",
}: {
  photo?: string | undefined;
  initials: string;
  name: string;
  size?: "md" | "lg";
}) {
  const dim = size === "lg" ? "size-32 sm:size-40" : "size-20";
  if (photo) {
    return (
      <div className="relative">
        <span className="pointer-events-none absolute -inset-2 rounded-full bg-primary/10 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
        <img
          src={photo}
          alt={name}
          className={`${dim} relative shrink-0 rounded-full bg-card object-cover shadow-lg ring-4 ring-primary-foreground/20 transition-transform duration-500 group-hover:scale-105`}
        />
      </div>
    );
  }
  return (
    <span
      className={`grid ${dim} shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-coral font-display font-bold text-primary-foreground shadow-lg ring-4 ring-primary-foreground/20 transition-transform duration-500 group-hover:scale-105 ${size === "lg" ? "text-4xl sm:text-5xl" : "text-lg"}`}
    >
      {initials}
    </span>
  );
}

export function TagList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <span
          key={t}
          className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-primary"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

export function HighlightList({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((h) => (
        <div
          key={h}
          className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 shadow-sm"
        >
          <Award className="mt-0.5 size-5 shrink-0 text-primary" />
          <span className="text-sm leading-6 text-foreground">{h}</span>
        </div>
      ))}
    </div>
  );
}

export function DoctorCard({ doctor }: { doctor: DoctorProfile }) {
  return (
    <Reveal>
      <article className="group relative flex flex-col items-center overflow-hidden rounded-3xl border border-border bg-card p-8 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-premium">
        <span className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-primary/10 blur-2xl transition-transform duration-700 group-hover:scale-150" aria-hidden="true" />
        <span className="pointer-events-none absolute left-1/2 top-4 h-px w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden="true" />
        <div className="relative">
          <ProfileAvatar
            photo={doctor.photo?.url}
            initials={doctorInitials(doctor.name)}
            name={doctor.name}
          />
          <span className="absolute -bottom-1 -right-1 grid size-8 place-items-center rounded-full border-4 border-card bg-sunny text-sunny-foreground shadow-sm transition-transform duration-300 group-hover:rotate-12">
            <Sparkles className="size-3.5" />
          </span>
        </div>
        <h3 className="mt-6 font-display text-xl text-foreground transition-colors duration-300 group-hover:text-primary">{doctor.name}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-primary">
          <Sparkles className="size-4" />
          {doctor.yearsOfExperience}+ years of experience
        </p>
        <p className="mt-2 flex items-center gap-1.5 text-sm leading-6 text-muted-foreground">
          <GraduationCap className="mt-0.5 size-4 shrink-0" />
          {doctor.qualification}
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-1.5">
          {doctor.services.map((t, index) => (
            <span
              key={t}
              className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-primary transition-transform duration-300 group-hover:-translate-y-0.5"
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              {t}
            </span>
          ))}
        </div>
        <Button asChild variant="hero" className="mt-6 w-full transition-transform duration-300 group-hover:scale-[1.02]">
          <Link to="/contact" search={{ doctor: doctor.id }} hash="appointment-form">
            <CalendarDays />
            Book Appointment
          </Link>
        </Button>
      </article>
    </Reveal>
  );
}

export function ManagementCard({
  profile,
  compact = false,
}: {
  profile: ManagementProfile;
  compact?: boolean;
}) {
  const shortCredentials = profile.credentials.slice(0, 3);
  const shortTags = profile.tags.slice(0, 3);
  const isMedicalLeader = profile.slug.includes("kamal");

  return (
    <Reveal>
      <article
        className={`group relative overflow-hidden rounded-[2rem] border border-primary/15 bg-card shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-premium ${compact ? "h-full" : ""}`}
      >
        <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-primary/10 blur-3xl transition-transform duration-700 group-hover:scale-150" />
        <div className="grid h-full lg:grid-cols-[minmax(240px,0.82fr)_1.18fr]">
          <div
            className={`relative overflow-hidden bg-soft ${
              compact ? "min-h-[320px] lg:min-h-[390px]" : "min-h-[420px] lg:min-h-[520px]"
            }`}
          >
            <img
              src={profile.photo}
              alt={profile.name}
              className="absolute inset-0 size-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.035]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
            <div className="absolute left-5 top-5 rounded-full bg-background/90 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-primary shadow-sm backdrop-blur">
              {isMedicalLeader ? "Leadership" : "Dental Leadership"}
            </div>
            <div className="absolute bottom-5 left-5 right-5 text-primary-foreground">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sunny">
                <Heart className="size-3.5 fill-current" />
                ROOTS Leadership
              </div>
              <p className="mt-2 max-w-xs font-display text-xl leading-tight">
                {isMedicalLeader ? "Building stronger healthcare systems." : "Creating healthier, happier smiles."}
              </p>
            </div>
          </div>

          <div className="flex flex-col p-6 sm:p-8 lg:p-9">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-primary">
                  <Stethoscope className="size-4" />
                  {profile.role}
                </p>
                <h3 className="mt-3 max-w-xl font-display text-2xl leading-tight text-foreground sm:text-3xl">
                  {profile.name}
                </h3>
              </div>
              <span className="hidden size-10 shrink-0 place-items-center rounded-full bg-accent text-primary sm:grid">
                <Sparkles className="size-4" />
              </span>
            </div>

            <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
              {profile.bio[0]}
            </p>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {shortCredentials.map((credential) => (
                <div key={credential} className="flex items-start gap-2 rounded-xl bg-soft/70 px-3 py-2.5 text-xs leading-5 text-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  {credential}
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {shortTags.map((tag) => (
                <span key={tag} className="rounded-full bg-accent px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-primary">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-7">
              <Button asChild variant="hero" className="w-full">
                <Link to="/about/our-management/$slug" params={{ slug: profile.slug }}>
                  View Full Profile
                  <Sparkles />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`size-4 ${n <= rating ? "fill-sunny text-sunny" : "text-border"}`}
        />
      ))}
    </span>
  );
}

export function ReviewCard({
  name,
  source,
  rating,
  text,
}: {
  name: string;
  source: string;
  rating: number;
  text: string;
}) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-border bg-card p-6 shadow-sm">
      <Stars rating={rating} />
      <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">“{text}”</p>
      <div className="mt-5 border-t border-border pt-4">
        <strong className="block text-sm text-foreground">{name}</strong>
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          via {source}
        </span>
      </div>
    </article>
  );
}

export function GoogleReviewsTeaser() {
  const { reviews, rating, userRatingCount, loading } = useGoogleReviews();
  if (loading) return null;

  if (rating == null && reviews.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-lg bg-background p-10 text-center shadow-sm">
        <p className="font-display text-lg text-foreground">No reviews yet</p>
        <p className="text-sm text-muted-foreground">
          Be the first to share your experience with ROOTS DENTAL CLINIC.
        </p>
        <Button asChild variant="outline">
          <a href={reviewLinks.google} target="_blank" rel="noreferrer">
            Leave a Review on Google
          </a>
        </Button>
      </div>
    );
  }

  const average =
    rating ?? Number((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1));
  const count = userRatingCount ?? reviews.length;
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg bg-background p-10 text-center shadow-sm">
      <Stars rating={Math.round(average)} />
      <p className="font-display text-2xl text-foreground">
        {average.toFixed(1)} rating from {count} patient reviews
      </p>
      <Button asChild variant="outline">
        <Link to="/reviews">Read Patient Reviews</Link>
      </Button>
    </div>
  );
}
