import "dotenv/config";
import { db } from "./src/lib/db";
import { tools } from "./src/lib/db/schema";
import { eq } from "drizzle-orm";

// Import all SEO content
import { TOOL_SEO } from "./src/config/tool-seo-content";
import { CALCULATOR_SEO } from "./src/config/calculator-seo-content";
import { developerSEOContent } from "./src/config/developer-seo-content";
import { converterSEOContent } from "./src/config/converter-seo-content";
import { securitySEOContent } from "./src/config/security-seo-content";
import { qrBarcodeSEOContent } from "./src/config/qr-barcode-seo-content";
import { imageSEOContent } from "./src/config/image-seo-content";
import { pdfSEOContent } from "./src/config/pdf-seo-content";

function generateRating(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash) + slug.charCodeAt(i);
    hash = hash & hash;
  }
  const positiveHash = Math.abs(hash);
  const score = 4.5 + (positiveHash % 5) / 10;
  const votes = 3000 + (positiveHash % 12000);
  return { score: parseFloat(score.toFixed(1)), votes };
}

function generateDefaultSEO(toolName: string, category: string, slug: string) {
  const capitalizedCat = category.charAt(0).toUpperCase() + category.slice(1);
  
  return {
    features: [
      { icon: "Zap", title: "Instant Results", description: `Get instant results with our ${toolName} - no waiting, no delays. Real-time processing as you type.` },
      { icon: "Shield", title: "100% Private", description: `All processing happens in your browser. Your data never leaves your device. Complete privacy guaranteed.` },
      { icon: "Sparkles", title: "Free Forever", description: `${toolName} is completely free with no hidden charges, no signup required, and no usage limits.` },
      { icon: "Smartphone", title: "Works Everywhere", description: `Responsive design works perfectly on mobile, tablet, and desktop. Use anywhere, anytime.` },
      { icon: "Gauge", title: "Lightning Fast", description: `Optimized for speed. Get accurate results in milliseconds. No page reloads needed.` },
      { icon: "Award", title: "Professional Quality", description: `Built with industry-standard algorithms. Trusted by thousands of professionals daily.` },
    ],
    steps: [
      { title: "Enter Your Input", description: `Type or paste your data into the ${toolName} input field. It accepts any valid input.` },
      { title: "Automatic Processing", description: `Our ${toolName} processes your input instantly in your browser using advanced algorithms.` },
      { title: "View Results", description: `See accurate results displayed clearly. Easy to read and understand at a glance.` },
      { title: "Copy or Export", description: `Copy results to clipboard with one click, or export for further use in your workflow.` },
    ],
    faqs: [
      { question: `What is a ${toolName}?`, answer: `${toolName} is a free online tool that helps you quickly and accurately perform ${toolName.toLowerCase()} operations. It works entirely in your browser for maximum privacy.` },
      { question: `Is this ${toolName} really free?`, answer: `Yes! Our ${toolName} is 100% free with no signup, no hidden charges, and no usage limits. Use it as many times as you need.` },
      { question: `Is my data safe with this ${toolName}?`, answer: `Absolutely. All processing happens locally in your browser. We never send, store, or track your data on our servers.` },
      { question: `Does ${toolName} work on mobile?`, answer: `Yes, our ${toolName} is fully responsive and works perfectly on all devices including smartphones, tablets, and desktops.` },
      { question: `Do I need to install anything?`, answer: `No installation needed! ${toolName} works entirely in your web browser. Just visit the page and start using it immediately.` },
      { question: `How accurate is the ${toolName}?`, answer: `Our ${toolName} uses industry-standard algorithms and formulas to ensure highly accurate results every time.` },
    ],
    related: [
      { name: `${capitalizedCat} Tools`, href: `/tools/${category}`, description: `Browse all ${category} tools` },
      { name: "All Tools", href: "/tools", description: "View complete tools list" },
      { name: "AI Prompts", href: "/prompts", description: "AI prompt library" },
      { name: "Free Online Tools", href: "/", description: "Discover more free tools" },
    ],
    rating: generateRating(slug),
  };
}

function normalizeSEOData(data: any, slug: string) {
  return {
    features: data.features || [],
    steps: data.steps || data.howToSteps || [],
    faqs: data.faqs || [],
    related: (data.related || data.relatedTools || []).map((t: any) => ({
      name: t.name,
      href: t.href,
      description: t.description,
    })),
    rating: data.rating || generateRating(slug),
  };
}

function getSEOForTool(slug: string, category: string) {
  // Try each category-specific source
  if (category === "text" && TOOL_SEO[slug]) {
    return normalizeSEOData(TOOL_SEO[slug], slug);
  }
  if (category === "calculators" && CALCULATOR_SEO[slug]) {
    return normalizeSEOData(CALCULATOR_SEO[slug], slug);
  }
  if (category === "developer" && developerSEOContent[slug]) {
    return normalizeSEOData(developerSEOContent[slug], slug);
  }
  if (category === "converters" && converterSEOContent[slug]) {
    return normalizeSEOData(converterSEOContent[slug], slug);
  }
  if (category === "security" && securitySEOContent[slug]) {
    return normalizeSEOData(securitySEOContent[slug], slug);
  }
  if (category === "qr-barcode" && qrBarcodeSEOContent[slug]) {
    return normalizeSEOData(qrBarcodeSEOContent[slug], slug);
  }
  if (category === "image" && imageSEOContent[slug]) {
    return normalizeSEOData(imageSEOContent[slug], slug);
  }
  if (category === "pdf" && pdfSEOContent[slug]) {
    return normalizeSEOData(pdfSEOContent[slug], slug);
  }
  
  return null;
}

async function migrate() {
  console.log("🚀 Starting SEO content migration...\n");

  const allTools = await db.select().from(tools);
  console.log(`Found ${allTools.length} tools in database\n`);

  let migrated = 0;
  let defaulted = 0;
  let errors = 0;

  for (const tool of allTools) {
    try {
      let seoData = getSEOForTool(tool.slug, tool.categorySlug);
      let isDefault = false;

      if (!seoData) {
        seoData = generateDefaultSEO(tool.name, tool.categorySlug, tool.slug);
        isDefault = true;
      }

      await db.update(tools)
        .set({
          seoFeatures: seoData.features,
          seoSteps: seoData.steps,
          seoFaqs: seoData.faqs,
          seoRelated: seoData.related,
          seoRating: seoData.rating,
          updatedAt: new Date(),
        })
        .where(eq(tools.id, tool.id));

      if (isDefault) {
        console.log(`  📝 DEFAULT: ${tool.categorySlug}/${tool.slug}`);
        defaulted++;
      } else {
        console.log(`  ✅ MIGRATED: ${tool.categorySlug}/${tool.slug}`);
        migrated++;
      }
    } catch (err: any) {
      console.error(`  ❌ ERROR: ${tool.slug} - ${err.message}`);
      errors++;
    }
  }

  console.log("\n═══════════════════════════════════════");
  console.log("🎉 MIGRATION COMPLETE!");
  console.log("═══════════════════════════════════════");
  console.log(`✅ Migrated (from files): ${migrated}`);
  console.log(`📝 Default generated:     ${defaulted}`);
  console.log(`❌ Errors:                ${errors}`);
  console.log(`📊 Total processed:       ${allTools.length}`);
  console.log("═══════════════════════════════════════\n");

  process.exit(0);
}

migrate().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});