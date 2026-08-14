import PageForm from "../PageForm";
import { createPage } from "../actions";

export const metadata = {
  title: "New Page - Iconic Dashboard",
};

export default function NewPagePage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add New Page</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Create a new page for your website</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <PageForm action={createPage} />
      </div>
    </div>
  );
}