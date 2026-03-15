"use client";

import { Suspense, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSearch } from "@/hooks/useSearch";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { SORT_OPTIONS } from "@/lib/constants";

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "";
  const initialSort = searchParams.get("sort") || "";

  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    products,
    isLoading,
  } = useSearch();

  /* ambil kategori dari produk */
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return Array.from(set);
  }, [products]);

  /* sync state dari URL */
  useEffect(() => {
    if (initialQuery !== searchQuery) setSearchQuery(initialQuery);
    if (initialCategory !== selectedCategory)
      setSelectedCategory(initialCategory);
    if (initialSort !== sortBy) setSortBy(initialSort);
  }, [initialQuery, initialCategory, initialSort]);

  /* sync URL */
  useEffect(() => {
    const params = new URLSearchParams();

    if (searchQuery) params.set("q", searchQuery);
    if (selectedCategory) params.set("category", selectedCategory);
    if (sortBy) params.set("sort", sortBy);

    router.replace(`/search?${params.toString()}`);
  }, [router, searchQuery, selectedCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 min-h-screen">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Search Products
        </h1>
        <p className="text-gray-600">Find products available in our store</p>
      </div>

      {/* SEARCH BAR + FILTER */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          {/* SEARCH */}
          <div className="flex-1">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          {/* CATEGORY */}
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="md:w-52"
          >
            <option value="">All Categories</option>

            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Select>

          {/* SORT */}
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="md:w-52"
          >
            <option value="">Sort by</option>

            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* RESULT */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {isLoading
              ? "Searching products..."
              : `${products.length} products found`}
          </p>
        </div>

        <ProductGrid products={products} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
