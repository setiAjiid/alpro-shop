"use client";

import Link from "next/link";
import { useCategories } from "@/hooks/useCategories";

export default function CategoriesPage() {
  const { data: categories = [], isLoading } = useCategories();

  return (
    <div className="py-6">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Categories
        </h1>
        <p className="text-gray-500 mt-1">Browse products by category</p>
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm animate-pulse"
            >
              <div className="h-6 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/products?category=${encodeURIComponent(category)}`}
              className="group bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md hover:border-blue-300 transition-all text-center"
            >
              <h3 className="text-lg font-semibold text-gray-900 capitalize group-hover:text-blue-600 transition">
                {category}
              </h3>

              <p className="text-sm text-gray-500 mt-1">Explore products</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
