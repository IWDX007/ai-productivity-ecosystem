// src/components/seo/SchemaMarkup.tsx

interface FAQ {
  question: string;
  answer: string;
}

interface Step {
  title: string;
  description: string;
}

interface Rating {
  score: number;
  count: number;
}

interface ToolSchemaProps {
  name: string;
  description: string;
  url: string;
  category: string;
  faqs?: unknown;
  steps?: unknown;
  rating?: unknown;
}

// Type guards
function isFAQArray(val: unknown): val is FAQ[] {
  return Array.isArray(val) && val.length > 0 && typeof val[0]?.question === "string";
}

function isStepArray(val: unknown): val is Step[] {
  return Array.isArray(val) && val.length > 0 && typeof val[0]?.title === "string";
}

function isRating(val: unknown): val is Rating {
  return typeof val === "object" && val !== null && "score" in val && "count" in val;
}

export function ToolSchema({ name, description, url, category, faqs, steps, rating }: ToolSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ai-productivity-ecosystem-azure.vercel.app";

  // SoftwareApplication Schema
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: name,
    description: description,
    url: url,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    ...(isRating(rating) && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: rating.score,
        ratingCount: rating.count,
        bestRating: 5,
        worstRating: 1,
      },
    }),
  };

  // FAQ Schema
  const faqSchema = isFAQArray(faqs) ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } : null;

  // HowTo Schema
  const howToSchema = isStepArray(steps) ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use ${name}`,
    description: description,
    step: steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.title,
      text: step.description,
    })),
  } : null;

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${baseUrl}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category,
        item: `${baseUrl}/tools/${category}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: name,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

// Organization Schema
export function OrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ai-productivity-ecosystem-azure.vercel.app";

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AI Productivity Ecosystem",
    url: baseUrl,
    description: "Free online tools and AI prompts for productivity",
    sameAs: ["https://github.com/IWDX007/ai-productivity-ecosystem"],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AI Productivity Ecosystem",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/tools?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}