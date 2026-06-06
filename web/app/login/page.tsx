import { Suspense } from "react";
import type { Metadata } from "next";
import { LoginForm } from "./login-form";
import { Logo } from "@/components/logo";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-ink px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-4 text-center">
          <span className="rounded-xl bg-paper px-4 py-3">
            <Logo />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-bright">
              Internal Console
            </p>
            <h1 className="mt-1 font-serif text-2xl font-semibold text-paper">
              The room you run the show from
            </h1>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
        <p className="mt-6 text-center text-xs text-paper/40">
          Authorized access only · The Charles Blow Show
        </p>
      </div>
    </main>
  );
}
