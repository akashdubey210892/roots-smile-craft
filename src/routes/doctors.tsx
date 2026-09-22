import { createFileRoute } from "@tanstack/react-router";
import { CtaBanner, PageHero, SectionHeading } from "@/components/clinic";
import { DoctorCard } from "@/components/site-extras";
import { doctors } from "@/lib/clinic-data";

export const Route = createFileRoute("/doctors")({
  head: () => ({
    meta: [
      { title: "Our Dentists in Yelahanka | ROOTS Dental" },
      {
        name: "description",
        content:
          "Meet the dental care team at ROOTS DENTAL CLINIC in Yelahanka. Verified doctor details will be added soon.",
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
  return (
    <main>
      <PageHero
        eyebrow="Our doctors"
        title="A team focused on thoughtful, personalized care"
        text="Meet the dental care team at ROOTS in Yelahanka. Verified names and photos will replace these placeholder profiles soon."
      />
      <section className="section">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Meet the team"
            title="Our dental care team"
            text="Placeholder profiles for now — real names, qualifications and photos are on the way."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.slug} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>
      <CtaBanner />
    </main>
  );
}
