import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";

interface Tool {
  slug: string;
  name: string;
  description?: string | null;
  category_slug?: string;
}

interface RelatedToolsGridProps {
  currentToolSlug: string;
  categorySlug: string;
  categoryName: string;
  relatedTools: Tool[];
}

export default function RelatedToolsGrid({
  currentToolSlug,
  categorySlug,
  categoryName,
  relatedTools,
}: RelatedToolsGridProps) {
  const filtered = relatedTools
    .filter((t) => t.slug !== currentToolSlug)
    .slice(0, 6);

  if (filtered.length === 0) return null;

  return (
    <section className="my-12 rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 dark:border-gray-800 dark:from-gray-900 dark:to-gray-950">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-pink-500 text-white">
            <Wrench className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
              More {categoryName}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Explore related tools you might find useful
            </p>
          </div>
        </div>
        <Link
          href={`/tools/${categorySlug}`}
          className="hidden items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700 sm:inline-flex dark:text-red-400"
        >
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.category_slug || categorySlug}/${tool.slug}`}
            className="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-red-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-red-700"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 group-hover:text-red-600 dark:text-white dark:group-hover:text-red-400">
                {tool.name}
              </h3>
              {tool.description && (
                <p className="mt-1 line-clamp-2 text-xs text-gray-600 dark:text-gray-400">
                  {tool.description}
                </p>
              )}
            </div>
            <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-red-500" />
          </Link>
        ))}
      </div>

      <div className="mt-4 sm:hidden">
        <Link
          href={`/tools/${categorySlug}`}
          className="flex items-center justify-center gap-1 text-sm font-medium text-red-600 dark:text-red-400"
        >
          View All {categoryName} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}