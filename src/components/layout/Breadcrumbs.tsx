import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="container mx-auto px-4 py-3" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-xs text-theme-secondary flex-wrap">
        <li>
          <Link href="/" className="flex items-center gap-1 hover:text-crimson-500 transition-colors">
            <Home className="w-3 h-3" />
            Home
          </Link>
        </li>
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <ChevronRight className="w-3 h-3" />
            {item.href ? (
              <Link href={item.href} className="hover:text-crimson-500 transition-colors">{item.label}</Link>
            ) : (
              <span className="text-theme-primary font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}