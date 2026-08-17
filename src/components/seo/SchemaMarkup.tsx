// src/components/seo/SchemaMarkup.tsx

interface ToolSchemaProps {
  name: string;
  description: string;
  url: string;
  category: string;
  faqs?: { question: string; answer: string }[];
  steps?: { title: string; description: string }[];
  rating?: { score: number; count: number };
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
    ...(rating && {
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
  const faqSchema = faqs && faqs.length > 0 ? {
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
  const howToSchema = steps && steps.length > 0 ? {
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

// Organization Schema (for layout.tsx)
export function OrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ai-productivity-ecosystem-azure.vercel.app";

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AI Productivity Ecosystem",
    url: baseUrl,
    description: "Free online tools and AI prompts for productivity",
    sameAs: [
      "https://github.com/IWDX007/ai-productivity-ecosystem",
    ],
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