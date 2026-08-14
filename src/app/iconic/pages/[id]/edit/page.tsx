import { db } from "@/lib/db";
import { pages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import PageForm from "../../PageForm";
import { updatePage } from "../../actions";

export const metadata = {
  title: "Edit Page - Iconic Dashboard",
};

export default async function EditPagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pageId = parseInt(id);
  
  const [pageData] = await db.select().from(pages).where(eq(pages.id, pageId));
  
  if (!pageData) notFound();

  const updateAction = async (formData: FormData) => {
    "use server";
    await updatePage(pageId, formData);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Page: {pageData.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">URL: /{pageData.slug}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <PageForm page={pageData} action={updateAction} isEdit />
      </div>
    </div>
  );
}