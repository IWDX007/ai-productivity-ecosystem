import Link from "next/link";
import {
  FileText,
  Calculator,
  Repeat,
  Code,
  Image as ImageIcon,
  FileType,
  QrCode,
  Shield,
  Sparkles,
  Palette,
  Music,
  Globe,
} from "lucide-react";

interface Category {
  slug: string;
  name: string;
  description?: string | null;
  toolCount?: number;
}

interface ExploreCategoriesProps {
  categories: Category[];
  currentCategorySlug?: string;
}

const iconMap: Record<string, any> = {
  "text-tools": FileText,
  calculators: Calculator,
  converters: Repeat,
  "developer-tools": Code,
  "image-tools": ImageIcon,
  "pdf-tools": FileType,
  "qr-barcode": QrCode,
  security: Shield,
  ai: Sparkles,
  design: Palette,
  audio: Music,
  web: Globe,
};

export default function ExploreCategories({
  categories,
  currentCategorySlug,
}: ExploreCategoriesProps) {
  const filtered = categories.filter((c) => c.slug !== currentCategorySlug);

  if (filtered.length === 0) return null;

  return (
    <section className="my-12 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
          Explore More Categories
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Discover 200+ free tools across all categories
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((category) => {
          const Icon = iconMap[category.slug] || Sparkles;
          return (
            <Link
              key={category.slug}
              href={`/tools/${category.slug}`}
              className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-4 transition-all hover:-translate-y-0.5 hover:border-red-300 hover:shadow-md dark:border-gray-800 dark:from-gray-900 dark:to-gray-950 dark:hover:border-red-700"
            >
              <div className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-pink-500 text-white shadow-sm transition-transform group-hover:scale-110">
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="truncate font-semibold text-gray-900 group-hover:text-red-600 dark:text-white dark:group-hover:text-red-400">
                  {category.name}
                </h3>
                {category.toolCount !== undefined && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {category.toolCount} tools
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}