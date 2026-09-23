import { createFileRoute } from "@tanstack/react-router";
import { CtaBanner, PageHero, SectionHeading } from "@/components/clinic";
import { DoctorCard } from "@/components/site-extras";
import { useDoctors } from "@/lib/doctors";

export const Route = createFileRoute("/doctors")({
  head: () => ({
    meta: [
      { title: "Our Dentists in Yelahanka | ROOTS Dental" },
      {
        name: "description",
        content: "Meet the dental care team at ROOTS DENTAL CLINIC in Yelahanka.",
      },
      { property: "og:title", content: "Our Doctors | ROOTS DENTAL CLINIC" },
      {
        property: "og:description",
        content: "Explore the dental care team at ROOTS in Yelahanka.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/doctors" }],
  }),
  component: Doctors,
});

function Doctors() {
  const { doctors, loading } = useDoctors();

  // Keep the Firestore/default ordering unchanged elsewhere, but display
  // the Our Doctors page from highest to lowest clinical experience.
  const doctorsByExperience = [...doctors].sort(
    (a, b) => b.yearsOfExperience - a.yearsOfExperience,
  );

  return (
    <main>
      <PageHero
        eyebrow="Our doctors"
        title="A team focused on thoughtful, personalized care"
        text="Meet the dental care team at ROOTS in Yelahanka."
      />
      <section className="section">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Meet the team"
            title="Our dental care team"
            text="Experienced dental professionals dedicated to personalized treatment."
          />
          {loading ? (
            <p className="mt-10 text-sm text-muted-foreground">Loading our doctors…</p>
          ) : doctorsByExperience.length === 0 ? (
            <p className="mt-10 text-sm text-muted-foreground">
              Doctor profiles will appear here soon.
            </p>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {doctorsByExperience.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </section>
      <CtaBanner />
    </main>
  );
}
