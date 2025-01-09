import { EditCategoryForm } from "@/app/components/dashboard/EditCategoryForm";
import prisma from "@/app/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";

async function getData(categoryId: string) {
  const data = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function EditRoute({
  params,
}: {
  params: { id: string };
}) {
  noStore();
  const data = await getData(params.id);
  return <EditCategoryForm data={data} />;
}
