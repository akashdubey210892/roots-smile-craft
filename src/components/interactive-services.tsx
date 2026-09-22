import { useState } from "react";
import { ArrowRight, CalendarDays, Check, ChevronDown, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { services, type Service } from "@/lib/clinic-data";
import { cn } from "@/lib/utils";

const featuredSlugs = [
  "general-dentistry",
  "restoration",
  "aligners",
  "braces",
  "smile-design",
  "pediatric-dentistry",
  "minor-surgical-procedures",
  "periodontal-treatment",
  "root-canal-treatment",
  "crown-and-bridge",
  "complete-denture",
  "removable-partial-denture",
  "implants",
  "wisdom-teeth-extraction",
  "tmj",
  "orofacial-pain",
];

function serviceImage(service: Service) {
  return service.image;
}

export function InteractiveServices() {
  const available = featuredSlugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is Service => Boolean(service));
  const [activeSlug, setActiveSlug] = useState(available[0]?.slug ?? "");
  const active = available.find((service) => service.slug === activeSlug) ?? available[0];

  if (!active) return null;

  return (
    <section className="relative overflow-hidden bg-soft py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute -left-24 top-16 size-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 size-80 rounded-full bg-coral/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">
            <Sparkles className="size-3.5" /> Our services
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Find the right care for your <span className="text-primary">smile</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Explore our dental treatments and discover the care that fits your needs, goals and stage of life.
          </p>
        </div>

        <div className="mt-12 lg:grid lg:grid-cols-[310px_1fr] lg:items-start lg:gap-5">
          {/* Desktop treatment navigation */}
          <div className="hidden rounded-3xl border border-border/70 bg-background/90 p-3 shadow-soft backdrop-blur-sm lg:sticky lg:top-28 lg:block">
            <div className="mb-3 px-3 pt-2 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Explore treatments
            </div>
            <div className="grid gap-1.5">
              {available.map((service) => {
                const selected = service.slug === active.slug;
                return (
                  <button
                    key={service.slug}
                    type="button"
                    onClick={() => setActiveSlug(service.slug)}
                    aria-pressed={selected}
                    className={cn(
                      "group flex w-full items-center gap-3 rounded-2xl p-3 text-left transition-all duration-300",
                      selected
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/15"
                        : "hover:-translate-y-0.5 hover:bg-accent",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-12 shrink-0 overflow-hidden rounded-xl bg-muted transition-transform duration-300 group-hover:scale-105",
                        selected && "bg-white/15",
                      )}
                    >
                      <img src={serviceImage(service)} alt="" className="h-full w-full object-cover" loading="lazy" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display text-base">{service.title}</span>
                      <span
                        className={cn(
                          "mt-0.5 block text-xs line-clamp-1",
                          selected ? "text-primary-foreground/75" : "text-muted-foreground",
                        )}
                      >
                        {service.short}
                      </span>
                    </span>
                    <ArrowRight className={cn("size-4 shrink-0", selected && "translate-x-0.5")} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile treatment navigation: compact selector keeps the selected details immediately visible. */}
          <div className="mb-5 lg:hidden">
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Choose a treatment
            </label>
            <Select value={active.slug} onValueChange={setActiveSlug}>
              <SelectTrigger className="h-14 rounded-2xl border-border/70 bg-background px-4 text-left shadow-soft">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {available.map((service) => (
                  <SelectItem key={service.slug} value={service.slug}>
                    {service.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="mt-2 flex items-center gap-2 px-1 text-xs text-muted-foreground">
              <ChevronDown className="size-3.5 text-primary" />
              Tap the selector to explore all 16 services
            </div>
          </div>

          <article key={active.slug} className="animate-rise overflow-hidden rounded-3xl border border-border/70 bg-background shadow-premium lg:col-start-2">
            <div className="grid lg:grid-cols-[.9fr_1.1fr]">
              <div className="relative min-h-[300px] overflow-hidden sm:min-h-[440px]">
                <img
                  key={active.slug}
                  src={serviceImage(active)}
                  alt={active.alt}
                  width={900}
                  height={700}
                  loading="eager"
                  className="absolute inset-0 h-full w-full object-cover animate-soft-in transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/5 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/75">ROOTS Dental Care</p>
                    <p className="mt-1 font-display text-2xl sm:text-3xl">{active.title}</p>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur-md">
                    <Sparkles className="size-5" />
                  </span>
                </div>
              </div>

              <div className="flex flex-col p-7 sm:p-10 lg:p-12">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Prevent • Protect • Smile</p>
                <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">{active.title}</h2>
                <p className="mt-4 leading-7 text-muted-foreground">{active.intro}</p>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {active.benefits.slice(0, 3).map((benefit) => (
                    <div key={benefit} className="rounded-2xl bg-soft p-4">
                      <span className="grid size-8 place-items-center rounded-full bg-primary/10 text-primary">
                        <Check className="size-4" />
                      </span>
                      <p className="mt-3 text-sm font-semibold leading-5">{benefit}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild variant="hero" size="lg">
                    <Link to="/contact" hash="appointment-form">
                      <CalendarDays /> Book a Consultation
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/services/$slug" params={{ slug: active.slug }}>
                      View Details <ArrowRight />
                    </Link>
                  </Button>
                </div>

                <div className="mt-8 border-t pt-7">
                  <h3 className="font-display text-xl">What to expect</h3>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {active.process.slice(0, 3).map((step, index) => (
                      <div key={step} className="rounded-2xl border bg-card p-4">
                        <span className="text-xs font-bold text-primary">0{index + 1}</span>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {active.indications.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-2xl border border-border/70 bg-background/75 p-4">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              <span className="text-sm leading-6 text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
