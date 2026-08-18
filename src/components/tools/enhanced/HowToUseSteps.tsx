import { MousePointerClick, Settings2, Download } from "lucide-react";

interface HowToUseStepsProps {
  toolName: string;
  steps?: {
    title: string;
    description: string;
  }[];
}

export default function HowToUseSteps({ toolName, steps }: HowToUseStepsProps) {
  const defaultSteps = [
    {
      title: "Enter Your Input",
      description: `Type or paste your content into the ${toolName} input field above.`,
    },
    {
      title: "Configure Settings",
      description: "Adjust any available options to customize the output as needed.",
    },
    {
      title: "Get Instant Results",
      description: "Your results appear instantly. Copy, download, or share them right away.",
    },
  ];

  const stepsToUse = steps || defaultSteps;
  const icons = [MousePointerClick, Settings2, Download];

  return (
    <section className="my-12 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
          How to Use {toolName}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Follow these simple steps to get started
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {stepsToUse.map((step, index) => {
          const Icon = icons[index] || MousePointerClick;
          return (
            <div
              key={index}
              className="relative rounded-xl border border-gray-100 bg-gradient-to-br from-red-50 to-pink-50 p-6 transition-all hover:shadow-lg dark:border-gray-800 dark:from-red-950/20 dark:to-pink-950/20"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-pink-500 text-white shadow-md">
                <Icon className="h-6 w-6" />
              </div>
              <div className="absolute right-4 top-4 text-3xl font-bold text-red-100 dark:text-red-900/30">
                {index + 1}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}