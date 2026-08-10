interface Step {
  title: string;
  description: string;
}

export default function HowToSection({ steps, title = "How To Use" }: { steps: Step[]; title?: string }) {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16 border-t border-theme">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-theme-primary mb-3">{title}</h2>
        <p className="text-theme-secondary">Simple steps to get started</p>
      </div>
      <div className="max-w-3xl mx-auto space-y-4">
        {steps.map((step, idx) => (
          <div key={idx} className="flex gap-4 p-5 glass-card border border-theme rounded-xl card-hover">
            <div className="flex-shrink-0 w-10 h-10 rounded-full gradient-crimson flex items-center justify-center text-white font-bold text-sm">
              {idx + 1}
            </div>
            <div>
              <h3 className="text-theme-primary font-semibold mb-1">{step.title}</h3>
              <p className="text-sm text-theme-secondary">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}