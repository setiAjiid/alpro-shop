"use client"

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
      <div className="aspect-square bg-gray-200 rounded-md mb-3" />
      <div className="h-4 bg-gray-200 rounded mb-2" />
      <div className="h-3 bg-gray-200 rounded w-3/4 mb-3" />
      <div className="flex justify-between items-center">
        <div className="h-5 bg-gray-200 rounded w-16" />
        <div className="h-4 bg-gray-200 rounded w-12" />
      </div>
    </div>
  );
}