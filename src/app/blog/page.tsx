import { Metadata } from "next";
import BlogListClient from "./BlogListClient";
import { getPublishedPosts, getAllPublishedCategories } from "@/lib/data/blogData";

const SITE_URL = "https://ai-productivity-ecosystem-azure.vercel.app";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Blog & Guides - AI Productivity Ecosystem",
  description: "Latest tutorials, tips, and guides for productivity tools and AI prompts.",
  openGraph: {
    title: "Blog & Guides - AI Productivity Ecosystem",
    description: "Latest tutorials, tips, and guides for productivity tools and AI prompts.",
    type: "website",
    siteName: "AI Productivity Ecosystem",
    images: [`${SITE_URL}/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Guides - AI Productivity Ecosystem",
    description: "Latest tutorials, tips, and guides for productivity tools and AI prompts.",
    images: [`${SITE_URL}/opengraph-image`],
  },
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getPublishedPosts(),
    getAllPublishedCategories(),
  ]);

  return <BlogListClient posts={posts} categories={categories} />;
}