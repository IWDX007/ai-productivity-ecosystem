# ============================================================
# CLERK AUTH FILES - AI Productivity Ecosystem
# Week 1 Day 4 - Part 1
# ============================================================

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  CREATING CLERK AUTH FILES" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# ============================================================
# FILE 1: middleware.ts (UPDATE)
# ============================================================
$middleware = @''
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Protected routes (require login)
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/admin(.*)",
]);

// Admin-only routes
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Protect dashboard routes
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // Admin routes require admin role (implement role check later)
  if (isAdminRoute(req)) {
    await auth.protect();
    // TODO: Add admin role check when Clerk metadata is set up
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
''@

[System.IO.File]::WriteAllText("$PWD\middleware.ts", $middleware, [System.Text.UTF8Encoding]::new($false))
Write-Host "  [1/5] middleware.ts (Clerk protection)" -ForegroundColor Green

# ============================================================
# FILE 2: src/app/layout.tsx (UPDATE with ClerkProvider)
# ============================================================
$layout = @''
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AI Productivity Ecosystem - 800+ Free Online Tools & AI Prompts",
    template: "%s | AI Productivity Ecosystem",
  },
  description: "800+ Free Online Tools & AI Prompts in One Place. PDF tools, image editors, calculators, converters, developer tools, and 500+ AI prompts.",
  keywords: ["online tools", "AI prompts", "PDF tools", "image editor", "calculators", "developer tools", "free tools"],
  authors: [{ name: "AI Productivity Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "AI Productivity Ecosystem",
    title: "AI Productivity Ecosystem - 800+ Free Online Tools",
    description: "Free online tools and AI prompts library",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Productivity Ecosystem",
    description: "800+ Free Online Tools & AI Prompts",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#FFD700",
          colorBackground: "#0A0A0A",
          colorInputBackground: "#171717",
          colorInputText: "#FFFFFF",
        },
        elements: {
          formButtonPrimary:
            "bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:opacity-90",
          card: "bg-[#171717] border border-white/10",
        },
      }}
    >
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        suppressHydrationWarning
      >
        <body className="min-h-full flex flex-col bg-[#0A0A0A] text-white" suppressHydrationWarning>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
''@

[System.IO.File]::WriteAllText("$PWD\src\app\layout.tsx", $layout, [System.Text.UTF8Encoding]::new($false))
Write-Host "  [2/5] src/app/layout.tsx (ClerkProvider added)" -ForegroundColor Green

# ============================================================
# FILE 3: Sign In Page
# ============================================================
$signIn = @''
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-400">
            Sign in to your account
          </p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-[#171717] border border-white/10 shadow-2xl",
            },
          }}
        />
      </div>
    </div>
  );
}
''@

[System.IO.File]::WriteAllText("$PWD\src\app\(auth)\sign-in\[[...sign-in]]\page.tsx", $signIn, [System.Text.UTF8Encoding]::new($false))
Write-Host "  [3/5] Sign In page" -ForegroundColor Green

# ============================================================
# FILE 4: Sign Up Page
# ============================================================
$signUp = @''
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Create Account
          </h1>
          <p className="text-gray-400">
            Join AI Productivity Ecosystem
          </p>
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-[#171717] border border-white/10 shadow-2xl",
            },
          }}
        />
      </div>
    </div>
  );
}
''@

[System.IO.File]::WriteAllText("$PWD\src\app\(auth)\sign-up\[[...sign-up]]\page.tsx", $signUp, [System.Text.UTF8Encoding]::new($false))
Write-Host "  [4/5] Sign Up page" -ForegroundColor Green

# ============================================================
# FILE 5: src/lib/auth.ts (Helper functions)
# ============================================================
$authHelpers = @''
/**
 * Auth Helpers - Clerk integration
 */

import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

/**
 * Get current user from Clerk + Database
 */
export async function getCurrentUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  // Get user from our database
  const dbUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId))
    .limit(1);

  return {
    clerk: clerkUser,
    db: dbUser[0] || null,
  };
}

/**
 * Sync Clerk user to database
 * Call this after user signs up
 */
export async function syncUserToDatabase() {
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, clerkUser.id))
    .limit(1);

  if (existingUser.length > 0) {
    return existingUser[0];
  }

  // Create new user
  const newUser = await db
    .insert(users)
    .values({
      clerkId: clerkUser.id,
      email: clerkUser.emailAddresses[0]?.emailAddress || "",
      name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
      avatar: clerkUser.imageUrl,
      plan: "free",
      role: "user",
    })
    .returning();

  return newUser[0];
}

/**
 * Check if user is admin
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.db?.role === "admin" || false;
}

/**
 * Require authentication (throws if not logged in)
 */
export async function requireAuth() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  return userId;
}

/**
 * Require admin (throws if not admin)
 */
export async function requireAdmin() {
  const isAdminUser = await isAdmin();
  if (!isAdminUser) {
    throw new Error("Admin access required");
  }
}
''@

[System.IO.File]::WriteAllText("$PWD\src\lib\auth.ts", $authHelpers, [System.Text.UTF8Encoding]::new($false))
Write-Host "  [5/5] src/lib/auth.ts (helper functions)" -ForegroundColor Green

# ============================================================
# VERIFICATION
# ============================================================
Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  VERIFICATION" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

$files = @(
    "middleware.ts",
    "src/app/layout.tsx",
    "src/app/(auth)/sign-in/[[...sign-in]]/page.tsx",
    "src/app/(auth)/sign-up/[[...sign-up]]/page.tsx",
    "src/lib/auth.ts"
)

foreach ($file in $files) {
    if (Test-Path -LiteralPath $file) {
        $size = (Get-Item -LiteralPath $file).Length
        Write-Host "  [OK] $file ($size bytes)" -ForegroundColor Green
    } else {
        Write-Host "  [X]  $file MISSING" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  NEXT STEPS" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  1. Restart dev server:" -ForegroundColor Yellow
Write-Host "     npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "  2. Test authentication:" -ForegroundColor Yellow
Write-Host "     http://localhost:3000/sign-up" -ForegroundColor White
Write-Host "     http://localhost:3000/sign-in" -ForegroundColor White
Write-Host ""
Write-Host "  3. Try to access dashboard:" -ForegroundColor Yellow
Write-Host "     http://localhost:3000/dashboard" -ForegroundColor White
Write-Host "     (should redirect to sign-in if not logged in)" -ForegroundColor Gray
Write-Host ""
Write-Host "  4. Tell AI: 'Clerk working!'" -ForegroundColor Cyan
Write-Host ""
