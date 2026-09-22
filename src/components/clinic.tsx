import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  X,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/use-reveal";
import { clinic, featuredSlugs, services, type Service } from "@/lib/clinic-data";
import logoIcon from "@/assets/roots-logo-icon.png";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", visible && "is-visible", className)}
    >
      {children}
    </div>
  );
}

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="ROOTS Dental Clinic home">
      <img
        src={logoIcon}
        alt=""
        className="size-11 shrink-0 object-contain transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110"
      />
      <span>
        <strong
          className={`block font-display text-lg leading-none ${inverse ? "text-footer-foreground" : "text-foreground"}`}
        >
          ROOTS
        </strong>
        <span
          className={`mt-1 block text-[9px] font-bold uppercase tracking-[0.22em] ${inverse ? "text-footer-muted" : "text-muted-foreground"}`}
        >
          Dental Clinic
        </span>
      </span>
    </Link>
  );
}

const nav = [
  { label: "Home", to: "/" as const },
  { label: "About Us", to: "/about" as const },
  { label: "Our Doctors", to: "/doctors" as const },
  { label: "Our Services", to: "/services" as const },
  { label: "Reviews", to: "/reviews" as const },
  { label: "Contact Us", to: "/contact" as const },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-4 py-2 text-sm font-bold text-muted-foreground transition-all hover:-translate-y-0.5 hover:bg-accent hover:text-foreground"
              activeProps={{ className: "text-primary bg-accent" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Button asChild size="lg" variant="hero">
            <Link to="/contact">
              <CalendarDays /> Book an Appointment
            </Link>
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Open navigation"
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav className="border-t bg-background px-5 py-4 lg:hidden" aria-label="Mobile navigation">
          <div className="mx-auto grid max-w-7xl gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-full px-4 py-3 font-bold text-foreground hover:bg-accent"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild size="lg" variant="hero" className="mt-2">
              <Link to="/contact" onClick={() => setOpen(false)}>
                Book an Appointment
              </Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  const socials = [
    { Icon: Instagram, label: "Instagram", href: "#" },
    { Icon: Facebook, label: "Facebook", href: "#" },
    { Icon: Youtube, label: "YouTube", href: "#" },
    { Icon: MessageCircle, label: "WhatsApp", href: clinic.whatsapp },
  ];
  return (
    <footer className="relative bg-footer text-footer-foreground pb-24 lg:pb-0">
      <svg
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        className="block h-8 w-full text-background"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0,32 C240,0 480,48 720,28 C960,8 1200,40 1440,16 L1440,48 L0,48 Z"
        />
      </svg>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-[1.25fr_.7fr_1fr_1.25fr] lg:px-8">
        <div>
          <Logo inverse />
          <p className="mt-5 max-w-sm text-sm leading-7 text-footer-muted">
            Comprehensive dental care focused on healthy smiles, advanced treatment and
            compassionate patient care.
          </p>
          <div className="mt-6 flex gap-2">
            {socials.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid size-10 place-items-center rounded-full border border-footer-border text-footer-muted transition-all duration-300 hover:-translate-y-1 hover:rotate-6 hover:bg-coral hover:text-coral-foreground hover:border-coral"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
        <FooterCol title="Quick Links" items={nav.map((n) => [n.label, n.to])} />
        <FooterCol
          title="Our Services"
          items={services.slice(0, 8).map((s) => [s.title, `/services/${s.slug}`])}
        />
        <div>
          <h2 className="font-display text-lg">Contact Us</h2>
          <div className="mt-5 grid gap-4 text-sm text-footer-muted">
            <a className="flex gap-3 hover:text-footer-foreground" href={`tel:${clinic.phone}`}>
              <Phone className="mt-0.5 size-4 shrink-0" />
              {clinic.phone}
            </a>
            <a className="flex gap-3 hover:text-footer-foreground" href={`mailto:${clinic.email}`}>
              <Mail className="mt-0.5 size-4 shrink-0" />
              {clinic.email}
            </a>
            <address className="flex gap-3 not-italic leading-6">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              {clinic.address}
            </address>
          </div>
        </div>
      </div>
      <div className="border-t border-footer-border">
        <div className="mx-auto max-w-7xl px-5 py-5 text-xs text-footer-muted lg:px-8">
          © 2026 ROOTS DENTAL CLINIC. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
function FooterCol({ title, items }: { title: string; items: string[][] }) {
  return (
    <div>
      <h2 className="font-display text-lg">{title}</h2>
      <ul className="mt-5 grid gap-3 text-sm text-footer-muted">
        {items.map(([label, to]) => (
          <li key={label}>
            <Link to={to as "/"} className="transition-colors hover:text-footer-foreground">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MobileActions() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 gap-2 border-t bg-background p-2.5 shadow-2xl lg:hidden">
      <Button asChild variant="ghost" className="rounded-full">
        <a href={`tel:${clinic.phone}`}>
          <Phone /> Call
        </a>
      </Button>
      <Button asChild variant="ghost" className="rounded-full">
        <a href={clinic.whatsapp} target="_blank" rel="noreferrer">
          <MessageCircle /> WhatsApp
        </a>
      </Button>
      <Button asChild variant="hero">
        <Link to="/contact">
          <CalendarDays /> Book
        </Link>
      </Button>
    </div>
  );
}

const heroIcons = [Sparkles, Check, Stethoscope, ShieldCheck];

export function PageHero({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <section className="page-hero">
      {heroIcons.map((Icon, i) => (
        <Icon
          key={i}
          aria-hidden="true"
          className={`animate-float-slow pointer-events-none absolute hidden text-primary/15 sm:block ${["top-10 right-[12%] size-14", "bottom-8 right-[28%] size-9", "top-1/3 left-[6%] size-10", "bottom-10 left-[18%] size-12"][i]}`}
          style={{ animationDelay: `${i * 0.7}s` }}
        />
      ))}
      <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <p className="eyebrow animate-pop">
          <Sparkles className="size-3.5" />
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{text}</p>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  centered?: boolean;
}) {
  return (
    <Reveal className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="eyebrow">
        <Sparkles className="size-3.5" />
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl leading-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {text && <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">{text}</p>}
    </Reveal>
  );
}

export function ServiceCard({ service, delay = 0 }: { service: Service; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <article className="service-card group">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={service.image}
            alt={service.alt}
            width={480}
            height={360}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.08] group-hover:rotate-1"
          />
        </div>
        <div className="p-6">
          <h3 className="font-display text-xl text-foreground">{service.title}</h3>
          <p className="mt-2 min-h-14 text-sm leading-6 text-muted-foreground">{service.short}</p>
          <Button asChild variant="link" className="mt-3 h-auto p-0">
            <Link to="/services/$slug" params={{ slug: service.slug }}>
              Learn More <ArrowRight />
            </Link>
          </Button>
        </div>
      </article>
    </Reveal>
  );
}

export function ServicesSlider() {
  const featured = featuredSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is Service => Boolean(s));
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive((i) => (i + 1) % featured.length), 4500);
    return () => window.clearInterval(timer);
  }, [featured.length]);
  const move = (direction: number) =>
    setActive((i) => (i + direction + featured.length) % featured.length);
  const current = featured[active];
  if (!current) return null;
  return (
    <div className="relative overflow-hidden rounded-3xl bg-card shadow-premium">
      <div className="grid lg:grid-cols-[1.15fr_.85fr]">
        <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[440px]">
          <img
            key={current.slug}
            src={current.image}
            alt={current.alt}
            className="h-full w-full animate-soft-in object-cover"
            width={800}
            height={600}
          />
        </div>
        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Featured treatment {active + 1} / {featured.length}
          </span>
          <h3 className="mt-4 font-display text-3xl text-foreground">{current.title}</h3>
          <p className="mt-4 leading-7 text-muted-foreground">{current.intro}</p>
          <Button asChild variant="hero" className="mt-7 w-fit">
            <Link to="/services/$slug" params={{ slug: current.slug }}>
              Learn More <ArrowRight />
            </Link>
          </Button>
          <div className="mt-9 flex items-center justify-between">
            <div className="flex gap-2">
              {featured.map((s, i) => (
                <button
                  key={s.slug}
                  onClick={() => setActive(i)}
                  aria-label={`Show ${s.title}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${i === active ? "w-9 bg-coral" : "w-2.5 bg-border hover:bg-primary/40"}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => move(-1)}
                aria-label="Previous service"
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => move(1)}
                aria-label="Next service"
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div
        className="pointer-events-none absolute -right-16 -top-20 size-72 rounded-full bg-coral/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-10 bottom-0 size-56 rounded-full bg-sunny/20 blur-3xl"
        aria-hidden="true"
      />
      <Sparkles
        className="animate-float pointer-events-none absolute right-[18%] top-8 size-8 text-sunny/70"
        aria-hidden="true"
      />
      <Reveal className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-14 lg:flex-row lg:items-center lg:px-8">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl">
            Ready to Take the Next Step Towards a Healthier Smile?
          </h2>
          <p className="mt-3 text-primary-foreground/80">
            Schedule your consultation with our dental care team today.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="hero" size="lg">
            <Link to="/contact">
              <CalendarDays /> Book an Appointment
            </Link>
          </Button>
          <Button asChild variant="outlineLight" size="lg">
            <a href={`tel:${clinic.phone}`}>
              <Phone /> {clinic.phone}
            </a>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

export function ServiceFaq({ service }: { service: Service }) {
  const faqs = [
    {
      q: `Is ${service.title.toLowerCase()} right for me?`,
      a: "Suitability depends on your oral health, symptoms and individual needs. A clinical examination allows the dentist to discuss appropriate options with you.",
    },
    {
      q: "What should I expect at the first visit?",
      a: "Your visit usually begins with a discussion of your concern and health history, followed by an examination and any clinically appropriate diagnostic records.",
    },
    {
      q: "How should I prepare?",
      a: "Bring relevant medical information and previous dental records if available. Continue your normal oral hygiene routine unless the clinic advises otherwise.",
    },
  ];
  return (
    <Accordion type="single" collapsible className="rounded-2xl border bg-card px-6">
      {faqs.map((faq, i) => (
        <AccordionItem key={faq.q} value={`faq-${i}`}>
          <AccordionTrigger className="py-5 text-base">{faq.q}</AccordionTrigger>
          <AccordionContent className="leading-7 text-muted-foreground">{faq.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export const trustItems = [
  {
    icon: Stethoscope,
    color: "primary",
    title: "Experienced Dental Professionals",
    text: "Dedicated dental professionals focused on personalized treatment.",
  },
  {
    icon: Sparkles,
    color: "coral",
    title: "Comprehensive Dental Care",
    text: "Thoughtful dental care for children, adults and seniors under one roof.",
  },
  {
    icon: ShieldCheck,
    color: "sunny",
    title: "Advanced Technology",
    text: "Modern equipment supports careful diagnosis, precision and comfort.",
  },
  {
    icon: MessageCircle,
    color: "primary",
    title: "Patient-Centric Approach",
    text: "Treatment plans shaped around each patient's individual needs.",
  },
  {
    icon: Check,
    color: "coral",
    title: "Hygiene & Safety",
    text: "High standards of sterilization, infection control and clinical hygiene.",
  },
  {
    icon: CalendarDays,
    color: "sunny",
    title: "Comfortable Environment",
    text: "A welcoming setting designed to make dental visits feel easier.",
  },
] as const;
