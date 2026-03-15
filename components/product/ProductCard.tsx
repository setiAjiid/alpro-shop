"use client"

import { Product } from "@/types/product"
import Link from "next/link"
import Image from "next/image"

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="group bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer h-full flex flex-col">
        <div className="aspect-square mb-3 overflow-hidden rounded-md bg-gray-50">
          <Image
            width={200}
            height={200}
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <h3 className="text-sm font-medium text-gray-900 mb-2 leading-snug overflow-hidden text-ellipsis whitespace-nowrap">
            {product.title}
          </h3>

          <div className="mt-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-bold text-gray-900">
                ${product.price}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-sm">★</span>
                <span className="text-xs text-gray-600">
                  {product.rating.rate}
                </span>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              {product.rating.count} reviews
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}