'use client'
import useCategories from "@/app/lib/hooks/useCategories";
import all from "@/public/all.jpeg";
import Image from "next/image";
import Link from "next/link";

export function CategoriesSelection() {
  const { categories, error, loading } = useCategories()
  return (
    <div className="py-24 sm:py-32">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-extrabold tracking-tight">
          Shop by Category
        </h2>

        <Link
          className="text-sm font-semibold text-primary hover:text-primary/80"
          href="/products/all"
        >
          Browse all Products &rarr;
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-y-6">

        {categories.map((category) => (
          <Link href={'/products/' + category.name} key={category.id} className="group aspect-w-3 aspect-h-1 rounded-xl overflow-hidden">
            <Image
              src={category?.image}
              alt={category.name}
              className="object-cover object-center"
              fill
            />
            <div className="bg-gradient-to-b from-transparent to-black opacity-55" />
            <div className="p-6 flex items-end">
              <Link href="/products/all">
                <h3 className="text-white font-semibold">{category.title}</h3>
                <p className="mt-1 text-sm text-white">Shop Now</p>
              </Link>
            </div>
          </Link>
        ))}


      </div>
    </div>
  );
}
