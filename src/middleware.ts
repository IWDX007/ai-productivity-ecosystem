import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { TOOL_CATEGORY_MAP } from "@/lib/toolRedirectMap";

// Admin email - only this user can access /iconic
const ADMIN_EMAIL = "rao.usamaanwar@gmail.com";

// Routes that require admin access
const isAdminRoute = createRouteMatcher(["/iconic(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;

  // 1. SHORT URL REDIRECT: /tools/[slug] -> /tools/[correctCategory]/[slug]
  const shortMatch = pathname.match(/^\/tools\/([a-z0-9-]+)\/?$/);
  if (shortMatch) {
    const slug = shortMatch[1];
    const category = TOOL_CATEGORY_MAP[slug];
    if (category) {
      const url = req.nextUrl.clone();
      url.pathname = `/tools/${category}/${slug}`;
      return NextResponse.redirect(url, 301);
    }
  }

  // 2. WRONG CATEGORY REDIRECT: /tools/[wrongCategory]/[slug] -> /tools/[correctCategory]/[slug]
  const categoryMatch = pathname.match(/^\/tools\/([a-z0-9-]+)\/([a-z0-9-]+)\/?$/);
  if (categoryMatch) {
    const wrongCategory = categoryMatch[1];
    const slug = categoryMatch[2];
    const correctCategory = TOOL_CATEGORY_MAP[slug];

    // If it's a known tool and category is wrong -> redirect to correct category
    if (correctCategory && wrongCategory !== correctCategory) {
      const url = req.nextUrl.clone();
      url.pathname = `/tools/${correctCategory}/${slug}`;
      return NextResponse.redirect(url, 301);
    }
  }

  // 3. ADMIN ROUTE PROTECTION
  if (isAdminRoute(req)) {
    const { userId, sessionClaims, redirectToSignIn } = await auth();

    if (!userId) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    const userEmail = (sessionClaims?.email as string) ||
                      (sessionClaims?.primaryEmail as string) ||
                      "";

    if (userEmail.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/(api|trpc)(.*)",
  ],
};