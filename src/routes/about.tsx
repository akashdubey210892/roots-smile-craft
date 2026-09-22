import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, HeartHandshake, ScanLine, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBanner, PageHero, Reveal, SectionHeading } from "@/components/clinic";
import consultation from "@/assets/patient-consultation.jpg";
export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ROOTS DENTAL CLINIC | Yelahanka" },
      {
        name: "description",
        content:
          "Learn about the patient-first foundation and management structure of ROOTS DENTAL CLINIC in Yelahanka.",
      },
      { property: "og:title", content: "About ROOTS DENTAL CLINIC" },
      {
        property: "og:description",
        content: "Strong foundations, ethical care and personalized dental treatment in Yelahanka.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});
function About() {
  const leaders = ["CEO", "Managing Director (MD)", "Head of Department (HOD)"];
  const values = [
    { Icon: ShieldCheck, label: "Ethical care" },
    { Icon: ScanLine, label: "Considered diagnosis" },
    { Icon: HeartHandshake, label: "Patient-first planning" },
  ];
  return (
    <main>
      <PageHero
        eyebrow="About ROOTS"
        title="Dentistry built on strong foundations"
        text="A patient-first approach shaped by prevention, accurate diagnosis, personalized treatment and long-term oral health."
      />
      <section className="section">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <SectionHeading eyebrow="Our philosophy" title="The ROOTS Foundation" />
            <p className="mt-6 leading-8 text-muted-foreground">
              ROOTS DENTAL CLINIC is founded on the belief that lasting oral health begins with
              strong foundations. Just as healthy roots support a strong tooth, our approach focuses
              on prevention, accurate diagnosis, personalized treatment and long-term oral health.
            </p>
            <p className="mt-4 leading-8 text-muted-foreground">
              ROOTS represents our commitment to building lasting relationships with patients
              through ethical dental care, advanced clinical practices and a patient-first
              philosophy.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {values.map(({ Icon, label }) => (
                <div
                  key={label}
                  className="rounded-2xl bg-soft p-4 text-sm font-semibold transition-transform duration-300 hover:-translate-y-1"
                >
                  <Icon className="mb-3 text-primary" />
                  {label}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <img
              src={consultation}
              alt="ROOTS dentist discussing personalized care with a patient"
              width={1400}
              height={1000}
              className="aspect-[7/5] rounded-3xl object-cover shadow-premium"
              loading="lazy"
            />
          </Reveal>
        </div>
      </section>
      <section className="section bg-soft">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            centered
            eyebrow="Leadership"
            title="Our Management"
            text="Profile details below are editable placeholders and will be updated when the clinic provides confirmed information."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {leaders.map((role, i) => (
              <Reveal key={role} delay={i * 100}>
                <article className="service-card">
                  <div className="grid aspect-[4/3] place-items-center bg-accent">
                    <span className="grid size-24 place-items-center rounded-full bg-background text-3xl font-display text-primary">
                      {i + 1}
                    </span>
                  </div>
                  <div className="p-7">
                    <p className="text-xs font-bold uppercase tracking-[.16em] text-primary">
                      {role}
                    </p>
                    <h3 className="mt-3 font-display text-2xl">Name to be confirmed</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      Biography, qualifications and areas of expertise will be added after the
                      clinic provides verified details.
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link to="/doctors">
                Meet Our Doctors <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <CtaBanner />
    </main>
  );
}
