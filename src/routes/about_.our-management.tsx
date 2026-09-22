import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Leaf, Sparkles } from "lucide-react";
import { CtaBanner } from "@/components/clinic";
import { ManagementCard } from "@/components/site-extras";
import { management } from "@/lib/clinic-data";

export const Route = createFileRoute("/about_/our-management")({
  head: () => ({
    meta: [
      { title: "Our Leadership | ROOTS Dental Clinic" },
      {
        name: "description",
        content:
          "Meet the leadership team behind ROOTS Dental Clinic, guiding clinical standards, healthcare management and patient-first care.",
      },
      { property: "og:title", content: "Our Leadership | ROOTS Dental Clinic" },
      {
        property: "og:description",
        content: "Meet the people guiding ROOTS with experience, compassion and a commitment to healthier smiles.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about/our-management" }],
  }),
  component: OurManagement,
});

function OurManagement() {
  return (
    <main className="overflow-hidden">
      <section className="relative bg-soft px-5 pb-10 pt-14 sm:pb-14 sm:pt-20 lg:px-8">
        <span className="pointer-events-none absolute -left-20 top-8 size-64 rounded-full bg-primary/10 blur-3xl" />
        <span className="pointer-events-none absolute -right-20 top-20 size-72 rounded-full bg-sunny/15 blur-3xl" />
        <div className="relative mx-auto max-w-6xl text-center">
          <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-primary">
            <Leaf className="size-4" />
            Our Leadership
          </p>
          <h1 className="mx-auto mt-4 max-w-4xl font-display text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Visionaries behind <span className="text-primary">healthier smiles</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Guiding ROOTS with experience, compassion and a commitment to clinical excellence, patient experience and better healthcare.
          </p>
          <div className="mt-5 flex items-center justify-center gap-2 text-sm font-semibold text-primary">
            <Heart className="size-4 fill-current" />
            People · Purpose · Better Smiles
            <Sparkles className="size-4 text-sunny" />
          </div>
        </div>
      </section>

      <section className="relative -mt-2 bg-soft pb-16 sm:pb-20">
        <div className="mx-auto max-w-[1600px] px-5 lg:px-10 xl:px-14">
          <div className="grid gap-8 lg:grid-cols-2">
            {management.map((profile) => (
              <ManagementCard key={profile.slug} profile={profile} compact />
            ))}
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/15 bg-card px-6 py-3 text-sm font-bold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary"
            >
              About ROOTS
              <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/doctors"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/15 bg-card px-6 py-3 text-sm font-bold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary"
            >
              Meet Our Doctors
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
