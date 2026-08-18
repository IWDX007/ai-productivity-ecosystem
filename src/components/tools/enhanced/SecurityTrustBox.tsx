import { Lock, ShieldCheck, KeyRound } from "lucide-react";

export default function SecurityTrustBox() {
  const features = [
    {
      icon: Lock,
      title: "SSL/TLS Encryption",
      description: "All data transferred is encrypted",
    },
    {
      icon: ShieldCheck,
      title: "Secured Data Centers",
      description: "Enterprise-grade security infrastructure",
    },
    {
      icon: KeyRound,
      title: "Privacy First",
      description: "We never store or share your data",
    },
  ];

  return (
    <section className="my-12 overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-red-50 via-pink-50 to-white p-6 sm:p-8 dark:border-gray-800 dark:from-red-950/20 dark:via-pink-950/10 dark:to-gray-900">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-4 py-1.5 text-xs font-semibold text-white">
            <ShieldCheck className="h-4 w-4" />
            Your Privacy Matters
          </div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
            Your Data, Our Priority
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            We go beyond just processing your files. Our robust security framework
            ensures that your data is always safe, whether you're converting, editing,
            or transforming content. With advanced encryption and secure infrastructure,
            we protect every aspect of your data.
          </p>
        </div>

        <div className="space-y-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-4 rounded-xl bg-white/70 p-4 backdrop-blur-sm dark:bg-gray-900/70"
              >
                <div className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-pink-500 text-white shadow-md">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}