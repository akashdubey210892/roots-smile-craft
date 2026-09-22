import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBanner, PageHero, Reveal, SectionHeading } from "@/components/clinic";
import { ReviewCard, Stars } from "@/components/site-extras";
import { reviewLinks } from "@/lib/clinic-data";
import { useGoogleReviews } from "@/lib/use-google-reviews";
import consultation from "@/assets/patient-consultation.jpg";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Patient Reviews | ROOTS Dental Clinic, Yelahanka" },
      {
        name: "description",
        content:
          "Read what patients say about dental care at ROOTS DENTAL CLINIC in Yelahanka, Bengaluru, and share your own review on Google.",
      },
      {
        name: "keywords",
        content: "Dental Clinic Yelahanka, Dentist Reviews, Patient Reviews, Google Reviews",
      },
      { property: "og:title", content: "Patient Reviews | ROOTS DENTAL CLINIC" },
      {
        property: "og:description",
        content:
          "Recent patient feedback from Google for ROOTS DENTAL CLINIC, Yelahanka, Bengaluru.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: Reviews,
});

function Reviews() {
  const { reviews: allReviews, rating, userRatingCount, loading } = useGoogleReviews();
  const reviews = allReviews.filter((r) => r.source !== "Just Dial");
  const hasSummary = rating != null || reviews.length > 0;
  const average =
    rating ??
    (reviews.length > 0
      ? Number((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1))
      : 0);
  const reviewCount = userRatingCount ?? reviews.length;

  return (
    <>
      <PageHero
        eyebrow="Patient reviews"
        title="What our patients say"
        text="Feedback from patients who have visited ROOTS DENTAL CLINIC in Yelahanka, collected from Google."
      />

      <section className="section">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="grid items-center gap-10 rounded-lg bg-soft p-8 sm:p-10 lg:grid-cols-[1fr_1fr]">
            <div>
              {loading ? (
                <p className="text-sm text-muted-foreground">Loading reviews…</p>
              ) : hasSummary ? (
                <>
                  <p className="font-display text-6xl text-foreground">{average.toFixed(1)}</p>
                  <div className="mt-3">
                    <Stars rating={Math.round(average)} />
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Based on {reviewCount} recent patient reviews published on Google.
                  </p>
                </>
              ) : (
                <p className="text-lg font-semibold text-foreground">
                  No reviews yet — be the first to share your experience.
                </p>
              )}
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild variant="hero" size="lg">
                  <a href={reviewLinks.google} target="_blank" rel="noreferrer">
                    Review us on Google <ExternalLink className="size-4" />
                  </a>
                </Button>
              </div>
            </div>
            <img
              src={consultation}
              alt="Dentist speaking with a patient at ROOTS Dental Clinic reception"
              loading="lazy"
              width={1280}
              height={720}
              className="aspect-video w-full rounded-lg object-cover shadow-premium"
            />
          </Reveal>

          <div className="mt-14">
            <SectionHeading eyebrow="Latest reviews" title="Recent patient feedback" />
            {loading ? (
              <p className="mt-10 text-sm text-muted-foreground">Loading reviews…</p>
            ) : reviews.length > 0 ? (
              <>
                <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {reviews.map((r) => (
                    <ReviewCard key={r.name} {...r} />
                  ))}
                </div>
                <p className="mt-8 text-xs leading-6 text-muted-foreground">
                  Reviews are published on Google by patients. To add yours, use the review button
                  above — your review will appear there.
                </p>
              </>
            ) : (
              <div className="mt-10 rounded-lg border border-dashed border-border bg-muted p-10 text-center">
                <p className="font-semibold text-foreground">No reviews to show yet</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Once patients leave reviews on Google, they'll appear here automatically.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
