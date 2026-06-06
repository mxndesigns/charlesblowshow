"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Monogram } from "@/components/logo";

const NAV: { href: string; label: string; group?: string }[] = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/segments", label: "Segments", group: "The Show" },
  { href: "/dashboard/revenue", label: "Revenue", group: "Brand / Marketing" },
  { href: "/dashboard/emails", label: "Emails" },
  { href: "/dashboard/social", label: "Social Media" },
  { href: "/dashboard/brand", label: "Brand & Partnership" },
  { href: "/dashboard/press", label: "Press" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(href + "/");
}

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function signOut() {
    await fetch("/api/auth", { method: "DELETE" });
    router.replace("/login");
    router.refresh();
  }

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-ink px-4 py-3 lg:hidden">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Monogram size={26} />
          <span className="font-serif text-sm font-semibold text-paper">
            Console
          </span>
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg border border-white/15 px-3 py-1.5 text-sm text-paper"
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <aside
        className={`${
          open ? "block" : "hidden"
        } border-b border-white/10 bg-ink lg:sticky lg:top-0 lg:block lg:h-dvh lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r`}
      >
        <div className="flex h-full flex-col p-4 lg:p-5">
          <Link
            href="/dashboard"
            className="mb-6 hidden items-center gap-2.5 px-2 lg:flex"
          >
            <Monogram size={30} />
            <span className="leading-tight">
              <span className="block font-serif text-sm font-semibold text-paper">
                The Charles Blow Show
              </span>
              <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-azure-bright">
                Internal Console
              </span>
            </span>
          </Link>

          <nav className="flex flex-1 flex-col gap-0.5">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <span key={item.href}>
                  {item.group && (
                    <span className="mb-1 mt-4 block px-3 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-paper/35">
                      {item.group}
                    </span>
                  )}
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                      active
                        ? "bg-azure text-white"
                        : "text-paper/70 hover:bg-white/5 hover:text-paper"
                    }`}
                  >
                    {item.label}
                  </Link>
                </span>
              );
            })}
          </nav>

          <div className="mt-4 border-t border-white/10 pt-4">
            <Link
              href="/"
              className="block rounded-lg px-3 py-2 text-sm text-paper/60 transition hover:bg-white/5 hover:text-paper"
            >
              View public site ↗
            </Link>
            <button
              onClick={signOut}
              className="mt-0.5 block w-full rounded-lg px-3 py-2 text-left text-sm text-paper/60 transition hover:bg-white/5 hover:text-paper"
            >
              Sign out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
