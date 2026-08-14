import { CategoryForm } from "../CategoryForm";

export default function NewCategoryPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add New Category</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Create a new category for organizing tools</p>
      </div>

      <CategoryForm />
    </div>
  );
}