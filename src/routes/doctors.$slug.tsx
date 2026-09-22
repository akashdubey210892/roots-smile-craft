import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBanner, SectionHeading } from "@/components/clinic";
import { DoctorCard, HighlightList, ProfileAvatar, TagList } from "@/components/site-extras";
import { clinic, doctors, getDoctor } from "@/lib/clinic-data";

export const Route = createFileRoute("/doctors/$slug")({
  loader: ({ params }) => {
    const doctor = getDoctor(params.slug);
    if (!doctor) throw notFound();
    return {
      name: doctor.name,
      role: doctor.role,
      seoDescription: doctor.seoDescription,
      keywords: doctor.keywords,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [
          { title: "Doctor not found | ROOTS Dental" },
          { name: "robots", content: "noindex" },
        ],
      };
    const { name, role, seoDescription, keywords } = loaderData;
    return {
      meta: [
        { title: `${name} – ${role} | ROOTS Dental` },
        { name: "description", content: seoDescription },
        { name: "keywords", content: keywords.join(", ") },
        { property: "og:title", content: name },
        { property: "og:description", content: seoDescription },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: DoctorNotFound,
  component: DoctorDetail,
});

function DoctorNotFound() {
  return (
    <section className="section">
      <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
        <h1 className="font-display text-4xl text-foreground">Doctor not found</h1>
        <p className="mt-4 text-muted-foreground">
          The profile you are looking for is not available. Browse our doctors instead.
        </p>
        <Button asChild className="mt-8">
          <Link to="/doctors">View Our Doctors</Link>
        </Button>
      </div>
    </section>
  );
}

function DoctorDetail() {
  const { slug } = Route.useParams();
  const doctor = getDoctor(slug)!;
  const others = doctors.filter((d) => d.slug !== doctor.slug);

  return (
    <>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <Link
            to="/doctors"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-sunny"
          >
            <ArrowLeft className="size-4" />
            Our Doctors
          </Link>
          <div className="mt-8 flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
            <ProfileAvatar initials={doctor.initials} size="lg" />
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-sunny">
                {doctor.role}
              </p>
              <h1 className="mt-2 font-display text-3xl leading-tight sm:text-5xl">
                {doctor.name}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 opacity-80 sm:text-base">
                {doctor.credentials.join(" · ")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[320px_1fr] lg:px-8">
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-widest text-primary">
                Qualifications
              </h2>
              <ul className="mt-4 grid gap-2.5">
                {doctor.credentials.map((c) => (
                  <li key={c} className="flex gap-2.5 text-sm leading-6 text-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    {c}
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="mt-6 w-full">
                <Link to="/contact" search={{ doctor: doctor.slug }} hash="appointment-form">
                  Book Appointment
                </Link>
              </Button>
              <Button asChild variant="outline" className="mt-3 w-full">
                <a href={`tel:${clinic.phone}`}>
                  <Phone />
                  Call {clinic.phone}
                </a>
              </Button>
            </div>
          </aside>

          <div className="grid gap-14">
            <div>
              <SectionHeading eyebrow="Areas of expertise" title="Expertise & Focus Areas" />
              <div className="mt-6">
                <TagList items={doctor.tags} />
              </div>
            </div>

            <div>
              <SectionHeading eyebrow="Clinical focus" title="Highlights" />
              <div className="mt-6">
                <HighlightList items={doctor.highlights} />
              </div>
            </div>

            <div>
              <SectionHeading eyebrow="Profile" title="About" />
              <div className="mt-6 grid gap-5">
                {doctor.bio.map((p, i) => (
                  <p key={i} className="leading-7 text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="section bg-soft">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading eyebrow="Our doctors" title="Meet the rest of the team" />
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {others.map((o) => (
                <DoctorCard key={o.slug} doctor={o} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner />
    </>
  );
}
