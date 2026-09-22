import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, Heart, Leaf, Phone, Sparkles, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBanner, SectionHeading } from "@/components/clinic";
import { HighlightList, ManagementCard, TagList } from "@/components/site-extras";
import { clinic, getManagementProfile, management } from "@/lib/clinic-data";

export const Route = createFileRoute("/about_/our-management_/$slug")({
  loader: ({ params }) => {
    const profile = getManagementProfile(params.slug);
    if (!profile) throw notFound();
    return { name: profile.name, role: profile.role, org: profile.org };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [
          { title: "Profile not found | ROOTS Dental Clinic" },
          { name: "robots", content: "noindex" },
        ],
      };
    const { name, role, org } = loaderData;
    return {
      meta: [
        { title: `${name} – ${role} | ROOTS Dental Clinic` },
        {
          name: "description",
          content: `${role} at ${org}. Read the leadership profile, expertise and career highlights.`,
        },
        { property: "og:title", content: name },
        { property: "og:description", content: `${role} at ${org}.` },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ProfileNotFound,
  component: ProfileDetail,
});

function ProfileNotFound() {
  return (
    <section className="section">
      <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
        <h1 className="font-display text-4xl text-foreground">Profile not found</h1>
        <p className="mt-4 text-muted-foreground">
          The profile you are looking for is not available. Browse our leadership team instead.
        </p>
        <Button asChild className="mt-8">
          <Link to="/about/our-management">View Our Leadership</Link>
        </Button>
      </div>
    </section>
  );
}

function ProfileDetail() {
  const { slug } = Route.useParams();
  const profile = getManagementProfile(slug)!;
  const others = management.filter((m) => m.slug !== profile.slug);

  return (
    <main className="overflow-hidden">
      <section className="relative bg-soft px-5 pb-12 pt-7 sm:pb-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-foreground" aria-label="Breadcrumb">
            <Link to="/" className="transition hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/about/our-management" className="transition hover:text-primary">Leadership</Link>
            <span>/</span>
            <span className="text-foreground">{profile.name}</span>
          </nav>

          <div className="relative mt-7 overflow-hidden rounded-[2rem] border border-primary/15 bg-card shadow-premium">
            <span className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
              <div className="relative min-h-[360px] overflow-hidden bg-soft sm:min-h-[440px] lg:min-h-[520px]">
                <img src={profile.photo} alt={profile.name} className="absolute inset-0 size-full object-cover object-top transition-transform duration-700 hover:scale-[1.02]" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/10 to-transparent" />
                <div className="absolute left-6 top-6 rounded-full bg-background/90 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.15em] text-primary shadow-sm backdrop-blur">
                  Our Leadership
                </div>
                <div className="absolute bottom-6 left-6 right-6 text-primary-foreground">
                  <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.15em] text-sunny">
                    <Heart className="size-4 fill-current" />
                    {profile.role}
                  </p>
                  <h1 className="mt-2 max-w-xl font-display text-3xl leading-tight sm:text-4xl">
                    {profile.name}
                  </h1>
                </div>
              </div>

              <div className="relative flex flex-col justify-center p-6 sm:p-9 lg:p-12">
                <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
                  <Leaf className="size-4" />
                  {profile.role}
                </p>
                <h2 className="mt-4 font-display text-3xl leading-tight text-foreground sm:text-5xl">
                  {profile.name}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                  {profile.bio[0]}
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {profile.credentials.map((credential) => (
                    <div key={credential} className="flex items-start gap-2 rounded-xl bg-soft px-3 py-3 text-xs font-semibold leading-5 text-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      {credential}
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button asChild variant="hero" className="flex-1">
                    <Link to="/contact" hash="appointment-form">
                      <CalendarDays />
                      Book an Appointment
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="sm:px-5">
                    <a href={`tel:${clinic.phone}`}>
                      <Phone />
                      Call Clinic
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1.35fr_0.65fr] lg:px-8">
          <div className="min-w-0">
            <SectionHeading eyebrow="About the leader" title={`About ${profile.name}`} />
            <div className="mt-7 grid gap-5">
              {profile.bio.slice(1).map((paragraph, index) => (
                <p key={index} className="text-sm leading-7 text-muted-foreground sm:text-base">
                  {paragraph}
                </p>
              ))}
            </div>

            {profile.closing && (
              <blockquote className="relative mt-8 overflow-hidden rounded-2xl border border-primary/15 bg-soft p-6 sm:p-8">
                <Sparkles className="absolute right-5 top-5 size-7 text-sunny/70" />
                <Heart className="size-6 text-primary" />
                <p className="mt-3 max-w-3xl font-display text-xl leading-8 text-foreground sm:text-2xl">
                  “{profile.closing}”
                </p>
              </blockquote>
            )}

            <div className="mt-12">
              <SectionHeading eyebrow="Career highlights" title="Experience & Achievements" />
              <div className="mt-6">
                <HighlightList items={profile.highlights} />
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-[1.5rem] border border-primary/15 bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-full bg-accent text-primary">
                  <Stethoscope className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-widest text-primary">Areas of expertise</p>
                  <p className="mt-1 text-sm text-muted-foreground">Clinical & leadership focus</p>
                </div>
              </div>
              <div className="mt-6">
                <TagList items={profile.tags} />
              </div>
              <div className="mt-6 border-t border-border pt-5">
                <p className="text-xs font-extrabold uppercase tracking-widest text-primary">Organisation</p>
                <p className="mt-2 text-sm leading-6 text-foreground">{profile.org}</p>
              </div>
              <Button asChild variant="hero" className="mt-6 w-full">
                <Link to="/about/our-management">
                  <ArrowLeft />
                  Back to Leadership
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      </section>

      {others.length > 0 && (
        <section className="section bg-soft">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading eyebrow="Leadership" title="Meet the rest of the team" text="Explore the people guiding ROOTS and the wider healthcare organisation." />
            <div className="mt-10 grid gap-6">
              {others.map((other) => (
                <ManagementCard key={other.slug} profile={other} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link to="/doctors" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                Meet our clinical team
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <CtaBanner />
    </main>
  );
}
