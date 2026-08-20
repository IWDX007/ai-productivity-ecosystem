import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Admin email - only this user can access /iconic
const ADMIN_EMAIL = "rao.usamaanwar@gmail.com";

// Routes that require admin access
const isAdminRoute = createRouteMatcher(["/iconic(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    const { userId, sessionClaims, redirectToSignIn } = await auth();

    // Not signed in → redirect to sign-in
    if (!userId) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // Get user email from session claims
    const userEmail = (sessionClaims?.email as string) || 
                      (sessionClaims?.primaryEmail as string) ||
                      "";

    // Not admin → redirect to home
    if (userEmail.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};