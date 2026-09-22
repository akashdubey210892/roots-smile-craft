import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBanner, Reveal, ServiceFaq } from "@/components/clinic";
import { getService } from "@/lib/clinic-data";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return service;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.title} in Yelahanka | ROOTS Dental`
          : "Dental Service | ROOTS Dental",
      },
      {
        name: "description",
        content:
          loaderData?.short ??
          "Explore personalized dental care at ROOTS DENTAL CLINIC in Yelahanka.",
      },
      {
        property: "og:title",
        content: loaderData
          ? `${loaderData.title} | ROOTS DENTAL CLINIC`
          : "Dental Service | ROOTS",
      },
      { property: "og:description", content: loaderData?.short ?? "Dental care in Yelahanka." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: loaderData ? [{ rel: "canonical", href: `/services/${loaderData.slug}` }] : [],
  }),
  component: ServiceDetail,
});

function ServiceDetail() {
  const service = Route.useLoaderData();
  return (
    <main>
      <div className="bg-soft">
        <div className="mx-auto max-w-7xl px-5 py-5 lg:px-8">
          <nav
            className="flex items-center gap-2 text-xs font-semibold text-muted-foreground"
            aria-label="Breadcrumb"
          >
            <Link to="/">Home</Link>
            <ChevronRight className="size-3" />
            <Link to="/services">Services</Link>
            <ChevronRight className="size-3" />
            <span className="text-foreground">{service.title}</span>
          </nav>
        </div>
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-5 lg:grid-cols-2 lg:px-8 lg:pb-24">
          <Reveal>
            <p className="eyebrow">Dental care in Yelahanka</p>
            <h1 className="mt-4 font-display text-4xl leading-tight sm:text-6xl">
              {service.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">{service.intro}</p>
            <Button asChild variant="hero" size="lg" className="mt-8">
              <Link to="/contact">
                Book an Appointment <ArrowRight />
              </Link>
            </Button>
          </Reveal>
          <Reveal delay={120}>
            <img
              src={service.image}
              alt={service.alt}
              width={760}
              height={570}
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-premium"
            />
          </Reveal>
        </div>
      </div>
      <section className="section">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
          <Reveal>
            <p className="eyebrow">Understanding your care</p>
            <h2 className="mt-3 font-display text-3xl">What is the treatment?</h2>
            <p className="mt-5 leading-7 text-muted-foreground">{service.intro}</p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            <Reveal delay={90}>
              <InfoBlock title="Why might you need it?" items={service.indications} />
            </Reveal>
            <Reveal delay={180}>
              <InfoBlock title="What patients can expect" items={service.process} />
            </Reveal>
          </div>
        </div>
      </section>
      <section className="section bg-soft">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <p className="eyebrow">Potential benefits</p>
              <h2 className="mt-3 font-display text-3xl">Care planned around you</h2>
              <div className="mt-7 grid gap-4">
                {service.benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-success-soft text-success">
                      <Check className="size-4" />
                    </span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <p className="eyebrow">Frequently asked questions</p>
              <h2 className="mt-3 font-display text-3xl">Helpful answers</h2>
              <div className="mt-7">
                <ServiceFaq service={service} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <CtaBanner />
    </main>
  );
}
function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-2xl border bg-card p-7 shadow-soft transition-transform duration-300 hover:-translate-y-1">
      <h3 className="font-display text-xl">{title}</h3>
      <ul className="mt-5 grid gap-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
            <Check className="mt-1 size-4 shrink-0 text-primary" />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
