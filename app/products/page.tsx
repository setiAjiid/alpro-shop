import { Suspense } from "react";
import ProductsContent from "./ProductsContent";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-20">
          <p className="text-gray-500">Loading products...</p>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
