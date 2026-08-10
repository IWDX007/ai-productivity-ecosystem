import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface RelatedTool {
  name: string;
  href: string;
  description: string;
  icon?: React.ReactNode;
}

export default function RelatedToolsSection({ tools, title = "Related Tools" }: { tools: RelatedTool[]; title?: string }) {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16 border-t border-theme">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-theme-primary mb-2">{title}</h2>
        <p className="text-theme-secondary">Explore more tools you might like</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool, idx) => (
          <Link
            key={idx}
            href={tool.href}
            className="group p-5 glass-card border border-theme rounded-xl card-hover"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-theme-primary font-semibold group-hover:text-crimson-500 transition-colors">
                {tool.name}
              </h3>
              <ArrowRight className="w-4 h-4 text-theme-muted group-hover:text-crimson-500 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-sm text-theme-secondary">{tool.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}