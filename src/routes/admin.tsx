import { useEffect, useState } from "react";
import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { authReady, getCurrentUser, signOutStaff, subscribeToAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import logoIcon from "@/assets/roots-logo-icon.png";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin | ROOTS DENTAL CLINIC" },
      { name: "robots", content: "noindex, nofollow, noarchive" },
      { name: "googlebot", content: "noindex, nofollow, noarchive" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  // Auth state lives in the browser (IndexedDB/localStorage), which the server
  // can't see during SSR — so this check runs client-side only, after hydration,
  // instead of in `beforeLoad`. A `beforeLoad` check would always see "signed out"
  // on the server and force a redirect on every hard refresh, even when the
  // browser's real session is still valid.
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    authReady.then(() => {
      if (cancelled) return;
      if (!getCurrentUser()) {
        navigate({ to: "/admin/login" });
      } else {
        setAuthed(true);
      }
    });
    const unsubscribe = subscribeToAuth((user) => {
      if (!user) navigate({ to: "/admin/login" });
    });
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [navigate]);

  async function handleLogout() {
    await signOutStaff();
    navigate({ to: "/admin/login" });
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-soft" />
    );
  }

  return (
    <div className="min-h-screen bg-soft">
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link to="/admin" className="flex items-center gap-3">
            <img src={logoIcon} alt="ROOTS" className="size-10" />
            <div>
              <p className="font-display text-xl">ROOTS</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Admin</p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm"><Link to="/">View site</Link></Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>Sign out</Button>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
