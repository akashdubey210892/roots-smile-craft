import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Mail, MapPin, Phone, Smile, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CtaBanner,
  Reveal,
  SectionHeading,
  ServiceCard,
  ServicesSlider,
  trustItems,
} from "@/components/clinic";
import { clinic, services } from "@/lib/clinic-data";
import { OffersSection, CampaignsSection } from "@/components/promotions";
import hero from "@/assets/roots-hero.jpg";
import consultation from "@/assets/patient-consultation.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dentist in Yelahanka | ROOTS DENTAL CLINIC" },
      {
        name: "description",
        content:
          "Personalized dental care, root canal treatment, implants, braces, aligners and pediatric dentistry in Yelahanka, Bengaluru.",
      },
      { property: "og:title", content: "ROOTS DENTAL CLINIC | Healthy Smiles Begin Here" },
      {
        property: "og:description",
        content: "Comprehensive, compassionate dental care for you and your family in Yelahanka.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Dentist",
          name: clinic.name,
          telephone: clinic.phone,
          email: clinic.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: "#63/2, Shree Sai Layout, Singanayakanahalli, Doddaballapur Main Road",
            addressLocality: "Yelahanka",
            addressRegion: "Karnataka",
            postalCode: "560064",
            addressCountry: "IN",
          },
        }),
      },
    ],
  }),
  component: Index,
});

const trustColors = {
  primary: {
    chip: "bg-primary/10 text-primary",
    hover: "group-hover:bg-primary group-hover:text-primary-foreground",
  },
  coral: {
    chip: "bg-coral/15 text-coral-strong",
    hover: "group-hover:bg-coral group-hover:text-coral-foreground",
  },
  sunny: {
    chip: "bg-sunny/40 text-sunny-foreground",
    hover: "group-hover:bg-sunny group-hover:text-sunny-foreground",
  },
} as const;

function Index() {
  return (
    <main>
      <section className="relative min-h-[680px] overflow-hidden bg-soft lg:min-h-[720px]">
        <img
          src={hero}
          alt="ROOTS dentist consulting with a patient in a modern dental clinic"
          width={1600}
          height={1050}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[67%_center]"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div
          className="pointer-events-none absolute -left-10 top-10 size-40 bg-primary/15 blob-shape blur-2xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute left-[8%] bottom-16 size-28 bg-sunny/40 blob-shape blur-xl"
          aria-hidden="true"
          style={{ animationDelay: "1.5s" }}
        />
        <Sparkles
          aria-hidden="true"
          className="animate-float pointer-events-none absolute left-[34%] top-16 hidden size-8 text-sunny drop-shadow-sm sm:block"
        />
        <Star
          aria-hidden="true"
          className="animate-float-slow pointer-events-none absolute left-[12%] top-[42%] hidden size-6 fill-coral text-coral drop-shadow-sm sm:block"
          style={{ animationDelay: "1s" }}
        />
        <Smile
          aria-hidden="true"
          className="animate-float pointer-events-none absolute left-[22%] bottom-[14%] hidden size-9 text-primary/70 drop-shadow-sm sm:block"
          style={{ animationDelay: "2s" }}
        />
        <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-5 py-20 lg:min-h-[720px] lg:px-8">
          <div className="max-w-2xl animate-rise">
            <span className="pill-badge text-primary">
              <Smile className="size-4 text-coral" /> Loved by families in Yelahanka
            </span>
            <h1 className="mt-5 font-display text-5xl leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
              Healthy Smiles Begin at <span className="text-primary">ROOTS</span>
            </h1>
            <p className="mt-5 text-xl font-semibold text-foreground">
              Comprehensive Dental Care for You and Your Family
            </p>
            <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
              At ROOTS DENTAL CLINIC, we combine advanced dental technology, experienced
              professionals and compassionate care to provide comfortable, personalized dental
              treatment for every patient.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">
                  <CalendarDays />
                  Book an Appointment
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/services">
                  Explore Our Services <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <OffersSection />

      <section className="section">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Featured care"
            title="Expert care for every smile"
            text="Explore some of the treatments available at ROOTS, thoughtfully planned around your oral health needs."
          />
          <Reveal delay={120} className="mt-10">
            <ServicesSlider />
          </Reveal>
        </div>
      </section>

      <section className="section relative overflow-hidden bg-soft">
        <div
          className="pointer-events-none absolute -right-16 top-1/2 size-72 -translate-y-1/2 bg-primary/10 blob-shape blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            centered
            eyebrow="Why ROOTS"
            title="Why Choose ROOTS DENTAL CLINIC?"
            text="Thoughtful dentistry grounded in clinical care, clear communication and respect for every patient."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trustItems.map(({ icon: Icon, title, text, color }, i) => {
              const c = trustColors[color];
              return (
                <Reveal key={title} delay={i * 90}>
                  <article className="feature-card group">
                    <span
                      className={`grid size-12 place-items-center rounded-full transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 ${c.chip} ${c.hover}`}
                    >
                      <Icon />
                    </span>
                    <h3 className="mt-5 font-display text-xl">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Our services"
              title="Care for every stage of your smile"
              text="From prevention and restoration to orthodontic and replacement options."
            />
            <Button asChild variant="outline">
              <Link to="/services">
                View All Services <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 8).map((s, i) => (
              <ServiceCard key={s.slug} service={s} delay={(i % 4) * 90} />
            ))}
          </div>
        </div>
      </section>

      <CampaignsSection />

      <section className="section bg-soft">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <img
              src={consultation}
              alt="Dentist explaining a digital dental scan to a patient"
              width={1400}
              height={1000}
              loading="lazy"
              className="aspect-[7/5] w-full rounded-3xl object-cover shadow-premium"
            />
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading
              eyebrow="Patient-first dentistry"
              title="Your Comfort. Your Confidence. Your Smile."
            />
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              From preventive care and routine dental treatments to advanced restorative, cosmetic
              and surgical procedures, ROOTS DENTAL CLINIC is committed to providing safe, ethical
              and personalized dental care.
            </p>
            <Button asChild variant="hero" className="mt-8">
              <Link to="/about">
                Discover our approach <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <CtaBanner />

      <section className="section">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
          <Reveal>
            <SectionHeading eyebrow="Visit us" title="Dental care close to home" />
            <h3 className="mt-7 font-display text-xl">{clinic.name}</h3>
            <address className="mt-3 max-w-md not-italic leading-7 text-muted-foreground">
              {clinic.address}
            </address>
            <div className="mt-6 grid gap-3">
              <a className="contact-link" href={`tel:${clinic.phone}`}>
                <Phone /> {clinic.phone}
              </a>
              <a className="contact-link" href={`mailto:${clinic.email}`}>
                <Mail /> {clinic.email}
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
                <a href={`tel:${clinic.phone}`}>
                  <Phone />
                  Call Now
                </a>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <MapEmbed />
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function MapEmbed() {
  return (
    <div className="min-h-[400px] overflow-hidden rounded-3xl border bg-soft shadow-soft">
      <iframe
        title="Map showing ROOTS Dental Clinic in Yelahanka"
        src="https://www.google.com/maps?q=Singanayakanahalli%20Yelahanka%20Bengaluru%20560064&output=embed"
        loading="lazy"
        className="h-full min-h-[400px] w-full border-0"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
