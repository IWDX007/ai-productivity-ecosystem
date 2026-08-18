import { Zap, Shield, Award } from "lucide-react";

export default function FeatureCards() {
  const features = [
    {
      icon: Zap,
      title: "Easy to Use",
      description: "Simple, intuitive interface. No technical knowledge required to get started.",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Award,
      title: "Best Quality",
      description: "Professional-grade results with high accuracy. Optimized for the best output.",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Shield,
      title: "Free & Secure",
      description: "100% free to use. Your data is processed securely and never stored on our servers.",
      color: "from-rose-500 to-red-500",
    },
  ];

  return (
    <section className="my-12">
      <div className="grid gap-6 sm:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="group rounded-2xl border border-gray-200 bg-white p-6 text-center transition-all hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
            >
              <div
                className={`mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${feature.color} text-white shadow-lg transition-transform group-hover:scale-110`}
              >
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}