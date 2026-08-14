import "dotenv/config";
import { db } from "@/lib/db";
import { pages } from "@/lib/db/schema";

const defaultPages = [
  {
    slug: "about",
    title: "About Us",
    metaTitle: "About Us - AI Productivity Ecosystem",
    metaDescription: "Learn about our mission to provide 200+ free online tools.",
    showInFooter: true,
    sortOrder: 1,
    content: `<h1>About Us</h1><p>Welcome to AI Productivity Ecosystem - your one-stop destination for free online tools.</p><h2>Our Mission</h2><p>To provide 900+ free, fast, and reliable tools.</p><h2>What We Offer</h2><ul><li>200+ working tools</li><li>AI prompts library</li><li>100% free, no signup</li></ul>`,
  },
  {
    slug: "contact",
    title: "Contact Us",
    metaTitle: "Contact Us - AI Productivity Ecosystem",
    metaDescription: "Get in touch with us.",
    showInFooter: true,
    sortOrder: 2,
    content: `<h1>Contact Us</h1><p>We would love to hear from you!</p><h2>Email</h2><p>hello@example.com</p>`,
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    metaTitle: "Privacy Policy",
    metaDescription: "Our privacy policy.",
    showInFooter: true,
    sortOrder: 3,
    content: `<h1>Privacy Policy</h1><p>Last updated: December 2026</p><h2>Data Collection</h2><p>All tool processing happens in your browser.</p>`,
  },
  {
    slug: "terms",
    title: "Terms of Service",
    metaTitle: "Terms of Service",
    metaDescription: "Terms and conditions.",
    showInFooter: true,
    sortOrder: 4,
    content: `<h1>Terms of Service</h1><p>By using our services, you agree to these terms.</p>`,
  },
  {
    slug: "faq",
    title: "FAQ",
    metaTitle: "Frequently Asked Questions",
    metaDescription: "Common questions.",
    showInFooter: true,
    sortOrder: 5,
    content: `<h1>FAQ</h1><h2>Are these tools free?</h2><p>Yes! All tools are completely free.</p><h2>Do you store data?</h2><p>No, everything runs in your browser.</p>`,
  },
  {
    slug: "disclaimer",
    title: "Disclaimer",
    metaTitle: "Disclaimer",
    metaDescription: "Legal disclaimer.",
    showInFooter: true,
    sortOrder: 6,
    content: `<h1>Disclaimer</h1><p>Information provided is for general purposes only.</p>`,
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    metaTitle: "Cookie Policy",
    metaDescription: "Cookie usage information.",
    showInFooter: true,
    sortOrder: 7,
    content: `<h1>Cookie Policy</h1><p>We use cookies to enhance your experience.</p>`,
  },
];

async function seed() {
  console.log("Seeding pages...");
  for (const page of defaultPages) {
    try {
      await db.insert(pages).values(page).onConflictDoNothing();
      console.log(`Added: ${page.slug}`);
    } catch (err) {
      console.log(`Skipped: ${page.slug}`);
    }
  }
  console.log("Done!");
  process.exit(0);
}

seed();