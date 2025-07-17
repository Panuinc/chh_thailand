import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { edgeLogger } from "@/lib/edgeLogger";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request) {
  const start = Date.now();
  const ip = request.headers.get("x-forwarded-for") || request.ip || "::1";
  const url = request.nextUrl;

  edgeLogger.info("📡 Incoming request", {
    method: request.method,
    ip,
    path: url.pathname,
  });

  const token = await getToken({ req: request, secret });

  const restrictedPaths = [
    "/role/create",
    "/division/create",
    "/department/create",
  ];

  const isRestricted =
    restrictedPaths.includes(url.pathname) ||
    url.pathname.match(/^\/(role|division|department)\/\d+$/);

  if (
    isRestricted &&
    (!token ||
      (token?.user?.roleName !== "Admin" &&
        token?.user?.divisionName !== "ทรัพยากรบุคคล"))
  ) {
    edgeLogger.warn("⛔ Unauthorized access blocked", {
      path: url.pathname,
      ip,
    });
    return NextResponse.redirect(new URL("/unauthorized", url));
  }

  const duration = Date.now() - start;
  edgeLogger.info("⏱️ Response time", {
    durationMs: duration,
    path: url.pathname,
    method: request.method,
  });

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/:path*",
    "/role/:path*",
    "/division/:path*",
    "/department/:path*",
  ],
};
