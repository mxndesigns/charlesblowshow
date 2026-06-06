import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, getSessionSecret } from "@/lib/auth";

/**
 * Gates the /dashboard route group. Unauthenticated requests are redirected to
 * /login (with a ?from= so we can bounce back after sign-in). Next.js 16 renamed
 * `middleware` → `proxy`; this runs on the Node.js runtime by default.
 */
export function proxy(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE)?.value;
  if (session === getSessionSecret()) {
    return NextResponse.next();
  }
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
