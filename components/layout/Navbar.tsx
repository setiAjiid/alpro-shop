"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();
  const { items } = useCart();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-blue-600 hover:text-blue-700"
        >
          AlproShop
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/products"
            className="text-gray-900 font-medium hover:text-blue-600"
          >
            Products
          </Link>

          <Link
            href="/categories"
            className="text-gray-900 font-medium hover:text-blue-600"
          >
            Categories
          </Link>
        </div>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center w-full max-w-sm"
        >
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />

            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-blue-600"
            >
              <Search size={18} />
            </button>
          </div>
        </form>

        {/* Cart + Mobile */}
        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="relative p-2 rounded-md hover:bg-gray-100"
          >
            <ShoppingCart className="h-5 w-5 text-gray-900" />

            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-6 py-4 space-y-4">
          <Link
            href="/products"
            className="block text-gray-900 font-medium hover:text-blue-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Products
          </Link>

          <Link
            href="/categories"
            className="block text-gray-900 font-medium hover:text-blue-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Categories
          </Link>

          <form onSubmit={handleSearch}>
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      )}
    </nav>
  );
}
