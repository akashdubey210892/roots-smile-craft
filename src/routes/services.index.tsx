import { createFileRoute } from "@tanstack/react-router";
import { CtaBanner } from "@/components/clinic";
import { InteractiveServices } from "@/components/interactive-services";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Dental Services in Yelahanka | ROOTS Dental" },
      {
        name: "description",
        content:
          "Explore general dentistry, restoration, root canal treatment, implants, braces, aligners, pediatric dentistry and more at ROOTS Dental Clinic in Yelahanka.",
      },
      { property: "og:title", content: "Our Dental Services | ROOTS DENTAL CLINIC" },
      {
        property: "og:description",
        content: "Explore comprehensive, personalized dental treatments in Yelahanka, Bengaluru.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <main>
      <InteractiveServices />
      <CtaBanner />
    </main>
  );
}
