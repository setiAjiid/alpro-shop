// hooks/useSearch.ts
import { useState, useMemo } from "react";
import { useProducts } from "./useProducts";
import { useDebounce } from "./useDebounce";

/**
 * Custom hook for product search functionality
 * Handles search query, filtering, and sorting
 */
export function useSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");

  const debouncedQuery = useDebounce(searchQuery, 300);

  const { data: products = [], isLoading } = useProducts(selectedCategory);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by search query
    if (debouncedQuery) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(debouncedQuery.toLowerCase()),
      );
    }

    // Sort products
    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "rating-desc":
            return b.rating.rate - a.rating.rate;
          case "title-asc":
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [products, debouncedQuery, sortBy]);

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    products: filteredAndSortedProducts,
    isLoading,
  };
}
