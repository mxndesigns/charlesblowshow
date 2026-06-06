"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") || "/dashboard";

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Sign-in failed.");
        setLoading(false);
        return;
      }
      router.replace(from.startsWith("/dashboard") ? from : "/dashboard");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label
          htmlFor="password"
          className="mb-1.5 block text-sm font-medium text-paper/80"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          autoFocus
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-paper outline-none transition placeholder:text-paper/40 focus:border-azure-bright focus:ring-2 focus:ring-azure-bright/25 disabled:opacity-60"
          placeholder="••••••••"
          aria-invalid={!!error}
          aria-describedby={error ? "login-error" : undefined}
        />
      </div>
      {error && (
        <p id="login-error" className="text-sm text-azure-bright" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center rounded-lg bg-azure px-6 py-3 font-semibold text-white transition hover:bg-azure-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azure-bright disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
