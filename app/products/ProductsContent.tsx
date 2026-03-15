"use client";

import { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { SORT_OPTIONS, ITEMS_PER_PAGE } from "@/lib/constants";
import { SlidersHorizontal, Package } from "lucide-react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryParam = searchParams.get("category") || "";
  const sortBy = searchParams.get("sort") || "";
  const currentPage = Number(searchParams.get("page") || "1");

  const { data: categories = [] } = useCategories();
  const { data: allProducts = [], isLoading } = useProducts(categoryParam);

  const updateQuery = (params: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) next.delete(key);
      else next.set(key, value);
    });
    router.push(`/products?${next.toString()}`);
  };

  const sortedProducts = useMemo(() => {
    const filtered = [...allProducts];
    if (sortBy) {
      filtered.sort((a, b) => {
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
  }, [allProducts, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedProducts, currentPage]);

  const pageWindow = useMemo(() => {
    const start = Math.max(1, Math.min(totalPages - 4, currentPage - 2));
    return Array.from(
      { length: Math.min(5, totalPages) },
      (_, i) => start + i,
    ).filter((p) => p <= totalPages);
  }, [currentPage, totalPages]);

  return (
    <div style={{ paddingBottom: "48px" }}>
      {/*  Page Header  */}
      <div style={{ marginBottom: "32px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "6px",
          }}
        >
          <Package
            size={22}
            strokeWidth={1.8}
            style={{ color: "var(--c-accent)" }}
          />
          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "var(--c-ink)",
              letterSpacing: "-0.025em",
              margin: 0,
              lineHeight: 1,
            }}
          >
            Products
          </h1>
        </div>
        <p style={{ fontSize: "0.9rem", color: "var(--c-ink-3)", margin: 0 }}>
          Discover our amazing collection
        </p>
      </div>

      {/*  Filter Bar  */}
      <div
        style={{
          background: "var(--c-surface)",
          border: "1px solid var(--c-border)",
          borderRadius: "var(--r-lg)",
          padding: "16px 20px",
          marginBottom: "28px",
          boxShadow: "var(--s-xs)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          {/* Left: controls */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "20px",
            }}
          >
            {/* Label */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "var(--c-ink-3)",
              }}
            >
              <SlidersHorizontal size={15} strokeWidth={2} />
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Filter
              </span>
            </div>

            {/* Divider */}
            <div
              style={{
                width: "1px",
                height: "20px",
                background: "var(--c-border-md)",
                flexShrink: 0,
              }}
            />

            {/* Category select */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <label
                htmlFor="category-select"
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  color: "var(--c-ink-3)",
                  whiteSpace: "nowrap",
                }}
              >
                Category
              </label>
              <Select
                id="category-select"
                value={categoryParam}
                onChange={(e) =>
                  updateQuery({ category: e.target.value || null, page: "1" })
                }
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Select>
            </div>

            {/* Sort select */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <label
                htmlFor="sort-select"
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  color: "var(--c-ink-3)",
                  whiteSpace: "nowrap",
                }}
              >
                Sort by
              </label>
              <Select
                id="sort-select"
                value={sortBy}
                onChange={(e) => updateQuery({ sort: e.target.value || null })}
              >
                <option value="">Default</option>
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {/* Right: result count */}
          {!isLoading && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "4px 12px",
                borderRadius: "var(--r-full)",
                background: "var(--c-bg-alt)",
                fontSize: "0.78rem",
                fontWeight: 500,
                color: "var(--c-ink-3)",
                whiteSpace: "nowrap",
              }}
            >
              {sortedProducts.length} item
              {sortedProducts.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Active filter chip */}
        {categoryParam && (
          <div
            style={{
              marginTop: "12px",
              paddingTop: "12px",
              borderTop: "1px solid var(--c-border)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "0.75rem", color: "var(--c-ink-4)" }}>
              Active:
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "3px 10px",
                borderRadius: "var(--r-full)",
                background: "var(--c-accent-bg)",
                border: "1px solid var(--c-accent-mid)",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "var(--c-accent)",
                textTransform: "capitalize",
              }}
            >
              {categoryParam}
              <button
                onClick={() => updateQuery({ category: null, page: "1" })}
                aria-label="Clear filter"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  background: "rgba(37,99,235,0.15)",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--c-accent)",
                  fontSize: "0.6rem",
                  padding: 0,
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            </span>
          </div>
        )}
      </div>

      {/*  Product Grid  */}
      <ProductGrid products={paginatedProducts} isLoading={isLoading} />

      {/*  Pagination  */}
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            marginTop: "52px",
            paddingTop: "24px",
            borderTop: "1px solid var(--c-border)",
          }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateQuery({ page: String(currentPage - 1) })}
            disabled={currentPage === 1}
          >
            ← Prev
          </Button>

          <div style={{ display: "flex", gap: "4px", margin: "0 6px" }}>
            {pageWindow.map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "primary" : "outline"}
                size="sm"
                onClick={() => updateQuery({ page: String(page) })}
                style={{
                  minWidth: "36px",
                  fontWeight: page === currentPage ? 700 : 400,
                  ...(page !== currentPage ? { color: "var(--c-ink-3)" } : {}),
                }}
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => updateQuery({ page: String(currentPage + 1) })}
            disabled={currentPage === totalPages}
          >
            Next →
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProductsContent;
