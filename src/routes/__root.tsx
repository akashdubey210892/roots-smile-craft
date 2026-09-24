import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { ArrowUp } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Footer, Header, MobileActions } from "@/components/clinic";
import { Button } from "@/components/ui/button";

const SITE_URL = "https://www.rootsadvanceddentalclinic.com";
const MAP_URL =
  "https://www.google.com/maps/place/Roots+Dental+Clinic/@13.1927079,77.4955784,9.78z/data=!4m6!3m5!1s0x3bae19cf0c69c9df:0x5157dd968efe4981!8m2!3d13.1429128!4d77.5693407!16s%2Fg%2F11zxr_x29p?entry=ttu&g_ep=EgoyMDI2MDkyMS4wIKXMDSoASAFQAw%3D%3D";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:scale-105 hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:scale-105 hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { viewport: "width=device-width, initial-scale=1" },
      { title: "ROOTS DENTAL CLINIC | Dentist in Yelahanka, Bengaluru" },
      { name: "author", content: "ROOTS DENTAL CLINIC" },
      {
        name: "description",
        content:
          "ROOTS DENTAL CLINIC in Yelahanka, Bengaluru provides personalized dental care including general dentistry, root canal treatment, implants, braces, clear aligners, pediatric dentistry and more.",
      },
      {
        name: "keywords",
        content:
          "dentist Yelahanka, dental clinic Yelahanka, dentist in Bengaluru, dental clinic Bengaluru, root canal Yelahanka, dental implants Yelahanka, braces Yelahanka, clear aligners Yelahanka, pediatric dentist Yelahanka, cosmetic dentist Yelahanka",
      },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "theme-color", content: "#0a8f98" },
      { name: "format-detection", content: "telephone=yes" },
      { property: "og:site_name", content: "ROOTS DENTAL CLINIC" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: `${SITE_URL}/favicon.png` },
      { property: "og:image:alt", content: "ROOTS DENTAL CLINIC logo" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ROOTS DENTAL CLINIC | Dentist in Yelahanka, Bengaluru" },
      {
        name: "twitter:description",
        content: "Personalized dental care for families in Yelahanka, Bengaluru.",
      },
      { name: "twitter:image", content: `${SITE_URL}/favicon.png` },
    ],
    links: [
      { rel: "canonical", href: SITE_URL },
      { rel: "sitemap", type: "application/xml", href: `${SITE_URL}/sitemap.xml` },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { rel: "icon", href: "/favicon.png", sizes: "512x512", type: "image/png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Dentist",
          "@id": `${SITE_URL}/#dentist`,
          name: "ROOTS DENTAL CLINIC",
          url: SITE_URL,
          image: `${SITE_URL}/favicon.png`,
          telephone: "+91 8009537637",
          email: "drykkiran@gmail.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "#63/2, Shree Sai Layout, Singanayakanahalli, Doddaballapur Main Road",
            addressLocality: "Yelahanka",
            addressRegion: "Karnataka",
            postalCode: "560064",
            addressCountry: "IN",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 13.1429128,
            longitude: 77.5693407,
          },
          areaServed: [
            { "@type": "City", name: "Bengaluru" },
            { "@type": "Place", name: "Yelahanka" },
          ],
          hasMap: MAP_URL,
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Outlet />
      <Footer />
      <MobileActions />
      <Button
        size="icon"
        className="fixed bottom-6 right-6 z-30 hidden rounded-full shadow-lg lg:inline-flex"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <ArrowUp />
      </Button>
    </QueryClientProvider>
  );
}
