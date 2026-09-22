import { useState } from "react";
import { ArrowRight, CalendarDays, CheckCircle2, ClipboardCheck, Smile, Stethoscope, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    title: "Tell us what you need",
    short: "Start with your concern",
    text: "Choose a service or simply tell us why you would like to visit. We keep the first step simple and comfortable.",
    icon: ClipboardCheck,
  },
  {
    number: "02",
    title: "Meet your dentist",
    short: "Choose your doctor",
    text: "Explore the ROOTS dental team and select a doctor whose expertise and availability suit your visit.",
    icon: Stethoscope,
  },
  {
    number: "03",
    title: "Pick a convenient time",
    short: "Find an available slot",
    text: "Choose a date and an available 15-minute appointment slot based on the doctor's live schedule.",
    icon: CalendarDays,
  },
  {
    number: "04",
    title: "Begin your smile journey",
    short: "We'll take it from there",
    text: "Reserve your slot and our team will contact you to confirm your visit and help you prepare.",
    icon: Smile,
  },
] as const;

export function SmileJourney() {
  const [active, setActive] = useState(0);
  const current = steps[active];
  const CurrentIcon = current.icon;

  return (
    <section className="section relative overflow-hidden bg-soft" aria-labelledby="smile-journey-title">
      <div className="pointer-events-none absolute -left-20 top-10 size-64 rounded-full bg-sunny/20 blur-3xl" aria-hidden="true" />
      <Sparkles className="pointer-events-none absolute right-[8%] top-10 size-8 animate-float text-sunny/70" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Your smile journey</p>
          <h2 id="smile-journey-title" className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
            From hello to a healthier smile
          </h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            A simple, friendly path to getting the care you need — with your doctor and appointment time in your hands.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
          <div className="grid gap-3 sm:grid-cols-2">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const selected = active === index;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-pressed={selected}
                  className={`group relative overflow-hidden rounded-3xl border p-5 text-left transition-all duration-300 ${
                    selected
                      ? "border-primary bg-background shadow-premium -translate-y-1"
                      : "border-border bg-background/70 hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft"
                  }`}
                >
                  <span className="absolute right-4 top-3 font-display text-4xl text-primary/10 transition-transform duration-500 group-hover:scale-110">
                    {step.number}
                  </span>
                  <span className={`grid size-11 place-items-center rounded-2xl transition-all duration-300 ${selected ? "bg-primary text-primary-foreground rotate-3" : "bg-accent text-primary group-hover:rotate-3"}`}>
                    <Icon className="size-5" />
                  </span>
                  <p className="mt-5 text-xs font-bold uppercase tracking-widest text-primary">Step {step.number}</p>
                  <h3 className="mt-2 font-display text-xl text-foreground">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{step.short}</p>
                </button>
              );
            })}
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-primary/15 bg-background p-7 shadow-premium sm:p-9">
            <div className="absolute -right-8 -top-8 size-28 rounded-full bg-primary/10 blur-2xl" aria-hidden="true" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="grid size-14 place-items-center rounded-2xl bg-accent text-primary">
                  <CurrentIcon className="size-7 animate-pop" key={current.number} />
                </span>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                  {current.number} / 04
                </span>
              </div>
              <h3 className="mt-7 font-display text-2xl text-foreground sm:text-3xl">{current.title}</h3>
              <p className="mt-4 leading-7 text-muted-foreground">{current.text}</p>
              <div className="mt-7 flex items-center gap-2" aria-label={`Step ${active + 1} of 4`}>
                {steps.map((step, index) => (
                  <span
                    key={step.number}
                    className={`h-1.5 rounded-full transition-all duration-500 ${index === active ? "w-10 bg-primary" : "w-5 bg-border"}`}
                  />
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="hero" className="group">
                  <Link to="/contact">
                    <CalendarDays />
                    Book an Appointment
                  </Link>
                </Button>
                {active < steps.length - 1 ? (
                  <Button variant="outline" className="group" onClick={() => setActive((active + 1) % steps.length)}>
                    Next step
                    <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-primary">
                    <CheckCircle2 className="size-4" /> You're ready to begin
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
