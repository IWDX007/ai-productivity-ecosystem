interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeaturesSection({ features, title = "Why Use Our Tool?" }: { features: Feature[]; title?: string }) {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-theme-primary mb-3">{title}</h2>
        <p className="text-theme-secondary max-w-2xl mx-auto">Everything you need in one place - fast, free, and secure.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <div key={idx} className="p-6 glass-card border border-theme rounded-xl card-hover">
            <div className="w-10 h-10 rounded-lg bg-crimson-500/10 border border-crimson-500/20 flex items-center justify-center mb-4 text-crimson-500">
              {feature.icon}
            </div>
            <h3 className="text-theme-primary font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-theme-secondary">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}