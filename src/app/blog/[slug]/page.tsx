import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts, getBlogCategoryById, getAllPublishedCategories } from "@/lib/data/blogData";
import BlogArticleClient from "./BlogArticleClient";

const SITE_URL = "https://ai-productivity-ecosystem-azure.vercel.app";

export const revalidate = 0;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) return { title: "Post Not Found" };
  
  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt || "";
  const url = `${SITE_URL}/blog/${post.slug}`;
  
  return {
    title,
    description,
    keywords: post.keywords || undefined,
    alternates: { canonical: url },
    openGraph: {
      title, description, url,
      type: "article",
      siteName: "AI Productivity Ecosystem",
      publishedTime: post.publishedAt?.toISOString(),
      images: [{
        url: post.featuredImage || `${SITE_URL}/opengraph-image`,
        width: 1200, height: 630,
        alt: post.featuredImageAlt || title,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title, description,
      images: [post.featuredImage || `${SITE_URL}/opengraph-image`],
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) notFound();
  
  const [category, relatedPosts, allCategories] = await Promise.all([
    getBlogCategoryById(post.categoryId),
    getRelatedPosts(post.id, post.categoryId, 3),
    getAllPublishedCategories(),
  ]);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.excerpt || "",
    image: post.featuredImage || `${SITE_URL}/opengraph-image`,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt?.toISOString(),
    publisher: {
      "@type": "Organization",
      name: "AI Productivity Ecosystem",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/opengraph-image` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogArticleClient 
        post={post} 
        category={category} 
        relatedPosts={relatedPosts}
        allCategories={allCategories}
      />
    </>
  );
}