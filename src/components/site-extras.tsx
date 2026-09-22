import { Link } from "@tanstack/react-router";
import { Award, CalendarDays, GraduationCap, Sparkles, Star } from "lucide-react";
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
      <img
        src={photo}
        alt={name}
        className={`${dim} shrink-0 rounded-full bg-card object-cover shadow-lg ring-4 ring-primary-foreground/20`}
      />
    );
  }
  return (
    <span
      className={`grid ${dim} shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-coral font-display font-bold text-primary-foreground shadow-lg ring-4 ring-primary-foreground/20 ${size === "lg" ? "text-4xl sm:text-5xl" : "text-lg"}`}
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
      <article className="flex flex-col items-center rounded-lg border border-border bg-card p-8 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <ProfileAvatar
          photo={doctor.photo?.url}
          initials={doctorInitials(doctor.name)}
          name={doctor.name}
        />
        <h3 className="mt-6 font-display text-xl text-foreground">{doctor.name}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-primary">
          <Sparkles className="size-4" />
          {doctor.yearsOfExperience}+ years of experience
        </p>
        <p className="mt-2 flex items-center gap-1.5 text-sm leading-6 text-muted-foreground">
          <GraduationCap className="mt-0.5 size-4 shrink-0" />
          {doctor.qualification}
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-1.5">
          {doctor.services.map((t) => (
            <span
              key={t}
              className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-primary"
            >
              {t}
            </span>
          ))}
        </div>
        <Button asChild variant="hero" className="mt-6 w-full">
          <Link to="/contact" search={{ doctor: doctor.id }} hash="appointment-form">
            <CalendarDays />
            Book Appointment
          </Link>
        </Button>
      </article>
    </Reveal>
  );
}

export function ManagementCard({ profile }: { profile: ManagementProfile }) {
  return (
    <Reveal>
      <article className="group flex flex-col items-center rounded-lg border border-border bg-card p-8 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <ProfileAvatar photo={profile.photo} initials={profile.initials} name={profile.name} />
        <p className="mt-6 text-xs font-bold uppercase tracking-widest text-primary">
          {profile.role}
        </p>
        <h3 className="mt-2 font-display text-xl text-foreground">{profile.name}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {profile.credentials.join(" · ")}
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-1.5">
          {profile.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-primary"
            >
              {t}
            </span>
          ))}
        </div>
        <Button asChild variant="outline" className="mt-6 w-full">
          <Link to="/about/our-management/$slug" params={{ slug: profile.slug }}>
            View Full Profile
          </Link>
        </Button>
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
