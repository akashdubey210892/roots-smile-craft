import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBanner, SectionHeading } from "@/components/clinic";
import { HighlightList, ManagementCard, ProfileAvatar, TagList } from "@/components/site-extras";
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
          content: `${role} at ${org}. Read the full profile, expertise and career highlights.`,
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
          <Link to="/about/our-management">View Our Management</Link>
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
    <main>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <Link
            to="/about/our-management"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-sunny"
          >
            <ArrowLeft className="size-4" />
            Our Management
          </Link>
          <div className="mt-8 flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
            <ProfileAvatar
              photo={profile.photo}
              initials={profile.initials}
              name={profile.name}
              size="lg"
            />
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-sunny">
                {profile.role}
              </p>
              <h1 className="mt-2 font-display text-3xl leading-tight sm:text-5xl">
                {profile.name}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 opacity-80 sm:text-base">
                {profile.org}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[320px_1fr] lg:px-8">
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-widest text-primary">
                Qualifications
              </h2>
              <ul className="mt-4 grid gap-2.5">
                {profile.credentials.map((c) => (
                  <li key={c} className="flex gap-2.5 text-sm leading-6 text-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    {c}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-6 w-full">
                <a href={`tel:${clinic.phone}`}>
                  <Phone />
                  Call {clinic.phone}
                </a>
              </Button>
              <Button asChild variant="outline" className="mt-3 w-full">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </aside>

          <div className="grid gap-14">
            <div>
              <SectionHeading eyebrow="Areas of expertise" title="Expertise & Focus Areas" />
              <div className="mt-6">
                <TagList items={profile.tags} />
              </div>
            </div>

            <div>
              <SectionHeading eyebrow="Career highlights" title="Key Achievements" />
              <div className="mt-6">
                <HighlightList items={profile.highlights} />
              </div>
            </div>

            <div>
              <SectionHeading eyebrow="Profile" title="About" />
              <div className="mt-6 grid gap-5">
                {profile.bio.map((p, i) => (
                  <p key={i} className="leading-7 text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>
              {profile.closing && (
                <blockquote className="mt-6 rounded-lg border-l-4 border-primary bg-soft p-6 text-lg font-medium italic leading-8 text-foreground">
                  “{profile.closing}”
                </blockquote>
              )}
            </div>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="section bg-soft">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading eyebrow="Leadership" title="Meet the rest of the team" />
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {others.map((o) => (
                <ManagementCard key={o.slug} profile={o} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner />
    </main>
  );
}
