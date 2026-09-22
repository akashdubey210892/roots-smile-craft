import { useState } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { services, type Service } from "@/lib/clinic-data";

const featuredServices = services.slice(0, 6);

export function InteractiveServices() {
  const [activeSlug, setActiveSlug] = useState(featuredServices[0]?.slug ?? "");
  const active: Service =
    featuredServices.find((service) => service.slug === activeSlug) ?? featuredServices[0];

  if (!active) return null;

  return (
    <section className="section relative overflow-hidden bg-soft">
      <div className="pointer-events-none absolute -left-16 top-12 size-48 rounded-full bg-sunny/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 size-56 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Explore your care</span>
          <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
            Find the right care for your smile
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tap a treatment to explore what it involves, then book a consultation when you're ready.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-stretch">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {featuredServices.map((service, index) => {
              const selected = service.slug === active.slug;
              return (
                <button
                  key={service.slug}
                  type="button"
                  onClick={() => setActiveSlug(service.slug)}
                  aria-pressed={selected}
                  className={`group flex items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300 ${
                    selected
                      ? "border-primary bg-background shadow-lg -translate-y-0.5"
                      : "border-border bg-card/70 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                  }`}
                >
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-full text-xs font-bold transition-transform duration-300 ${
                      selected ? "bg-primary text-primary-foreground rotate-6" : "bg-accent text-primary group-hover:rotate-6"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <strong className="block font-display text-lg text-foreground">{service.title}</strong>
                    <span className="mt-1 block line-clamp-2 text-xs leading-5 text-muted-foreground">
                      {service.short}
                    </span>
                  </span>
                  <ArrowRight className={`size-4 shrink-0 transition-transform duration-300 ${selected ? "text-primary translate-x-1" : "text-muted-foreground group-hover:translate-x-1"}`} />
                </button>
              );
            })}
          </div>

          <article key={active.slug} className="animate-rise overflow-hidden rounded-3xl border border-border bg-card shadow-premium">
            <div className="relative h-56 overflow-hidden sm:h-64">
              <img
                src={active.image}
                alt={active.alt}
                width={1200}
                height={700}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/65 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 text-sm font-bold text-foreground shadow-lg backdrop-blur">
                <Sparkles className="size-4 text-coral" />
                {active.title}
              </span>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-sm leading-7 text-muted-foreground">{active.intro}</p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">Good to know</p>
                  <ul className="mt-3 grid gap-2">
                    {active.benefits.slice(0, 3).map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-6 text-foreground">
                        <Check className="mt-1 size-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">What to expect</p>
                  <ol className="mt-3 grid gap-2">
                    {active.process.slice(0, 3).map((item, index) => (
                      <li key={item} className="flex gap-2 text-sm leading-6 text-muted-foreground">
                        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent text-[10px] font-bold text-primary">{index + 1}</span>
                        {item}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild variant="hero" className="group">
                  <Link to="/contact" hash="appointment-form">
                    Book a Consultation
                    <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/services/$slug" params={{ slug: active.slug }}>View Details</Link>
                </Button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
