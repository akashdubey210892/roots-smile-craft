import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { CtaBanner, PageHero, SectionHeading } from "@/components/clinic";
import { ManagementCard } from "@/components/site-extras";
import { management } from "@/lib/clinic-data";

export const Route = createFileRoute("/about_/our-management")({
  head: () => ({
    meta: [
      { title: "Our Management | ROOTS Dental Clinic" },
      {
        name: "description",
        content:
          "Meet the leadership team of ROOTS DENTAL CLINIC — CEO, Managing Director and Head of Department — guiding our clinical standards and patient care in Yelahanka.",
      },
      { property: "og:title", content: "Our Management" },
      {
        property: "og:description",
        content: "Meet the leadership team guiding ROOTS DENTAL CLINIC's patient care.",
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
    <main>
      <PageHero
        eyebrow="Leadership"
        title="Our Management"
        text="The leadership behind ROOTS DENTAL CLINIC sets the clinical standards, ethical practice and patient-first culture that guide every visit."
      />

      <section className="section">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Our team"
            title="Meet the leadership team"
            text="Experienced clinicians and healthcare administrators guiding every part of ROOTS' patient care."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {management.map((profile) => (
              <ManagementCard key={profile.slug} profile={profile} />
            ))}
          </div>
          <Link
            to="/about"
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-primary"
          >
            <ArrowLeft className="size-4" />
            Back to About Us
          </Link>
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
