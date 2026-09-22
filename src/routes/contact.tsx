import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppointmentForm, PageHero, Reveal } from "@/components/clinic";
import { clinic } from "@/lib/clinic-data";
export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Appointments | ROOTS Dental Yelahanka" },
      {
        name: "description",
        content:
          "Request a dental appointment at ROOTS DENTAL CLINIC, Singanayakanahalli, Yelahanka. Call 8009537637.",
      },
      { property: "og:title", content: "Contact ROOTS DENTAL CLINIC" },
      {
        property: "og:description",
        content: "Request an appointment or get directions to our Yelahanka dental clinic.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});
function Contact() {
  return (
    <main>
      <PageHero
        eyebrow="Contact us"
        title="Let’s care for your smile"
        text="Request a consultation, call our clinic, or find us in Singanayakanahalli, Yelahanka."
      />
      <section className="section">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.7fr_1.3fr] lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl">ROOTS DENTAL CLINIC</h2>
            <address className="mt-5 leading-7 text-muted-foreground not-italic">
              {clinic.address}
            </address>
            <div className="mt-8 grid gap-3">
              <a className="contact-link" href={`tel:${clinic.phone}`}>
                <Phone />
                {clinic.phone}
              </a>
              <a className="contact-link" href={`mailto:${clinic.email}`}>
                <Mail />
                {clinic.email}
              </a>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="hero">
                <a href={clinic.directions} target="_blank" rel="noreferrer">
                  <MapPin />
                  Get Directions
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={clinic.whatsapp} target="_blank" rel="noreferrer">
                  <MessageCircle />
                  WhatsApp Us
                </a>
              </Button>
            </div>
            <div className="mt-10 overflow-hidden rounded-3xl border shadow-soft">
              <iframe
                title="ROOTS Dental Clinic location in Yelahanka"
                src="https://www.google.com/maps?q=Singanayakanahalli%20Yelahanka%20Bengaluru%20560064&output=embed"
                loading="lazy"
                className="h-80 w-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
          <Reveal
            delay={120}
            className="relative overflow-hidden rounded-3xl border bg-card p-6 shadow-premium sm:p-10"
          >
            <Sparkles
              aria-hidden="true"
              className="animate-float pointer-events-none absolute right-6 top-6 size-8 text-sunny"
            />
            <p className="eyebrow">Appointment request</p>
            <h2 className="mt-3 font-display text-3xl">Tell us how we can help</h2>
            <p className="mb-8 mt-3 text-sm leading-6 text-muted-foreground">
              Share your preferred date and treatment. Our team will contact you to discuss
              availability.
            </p>
            <AppointmentForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
