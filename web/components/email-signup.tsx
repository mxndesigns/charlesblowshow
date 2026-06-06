"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function EmailSignup({
  id,
  variant = "light",
}: {
  id?: string;
  /** "light" on paper sections · "dark" on ink sections */
  variant?: "light" | "dark";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const onDark = variant === "dark";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage("You're in. Watch your inbox for the first dispatch.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        id={id}
        className={`rounded-xl border px-5 py-4 ${
          onDark
            ? "border-azure/40 bg-azure/15 text-paper"
            : "border-azure/40 bg-azure-tint text-ink"
        }`}
        role="status"
        aria-live="polite"
      >
        <p className="font-serif text-lg">
          <span className="text-azure">✓</span> {message}
        </p>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 sm:flex-row"
      noValidate
    >
      <label htmlFor={`${id}-email`} className="sr-only">
        Email address
      </label>
      <input
        id={`${id}-email`}
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === "loading"}
        className={`w-full flex-1 rounded-lg border px-4 py-3 outline-none transition focus:border-azure focus:ring-2 focus:ring-azure/25 disabled:opacity-60 ${
          onDark
            ? "border-white/15 bg-white/5 text-paper placeholder:text-paper/50"
            : "border-line bg-surface text-ink placeholder:text-muted"
        }`}
        aria-invalid={status === "error"}
        aria-describedby={message ? `${id}-msg` : undefined}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-azure px-6 py-3 font-semibold text-white transition hover:bg-azure-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azure disabled:opacity-60"
      >
        {status === "loading" ? "Joining…" : "Get the dispatch"}
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </button>
      {message && status === "error" && (
        <p id={`${id}-msg`} className="text-sm text-azure sm:basis-full">
          {message}
        </p>
      )}
    </form>
  );
}
