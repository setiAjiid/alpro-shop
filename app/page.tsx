import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      <div className="max-w-3xl text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-blue-600">AlproShop</span>
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Discover amazing products at great prices. Shop with confidence and
          enjoy fast, reliable delivery.
        </p>

        <Link
          href="/products"
          className="inline-block bg-blue-600 !text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
}
