// components/ProductCard.tsx
"use client";

interface Product {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  url: string;
  score?: number;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Determine image source based on URL format
  const imageSrc = product.url && product.url.includes("images.unsplash.com")
    ? product.url
    : "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80";

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
      {/* Image Container */}
      <div className="aspect-h-1 aspect-w-1 w-full bg-gray-100 p-4 sm:aspect-none h-48 flex items-center justify-center overflow-hidden border-b border-gray-100">
        <img
          src={imageSrc}
          alt={product.title}
          className="h-full w-full object-cover object-center transition-all group-hover:scale-105"
        />
        
        {/* Vector Match Score Badge */}
        {product.score !== undefined && (
          <span className="absolute top-3 right-3 rounded-md bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm">
            Match: {Math.round(product.score * 100)}%
          </span>
        )}
      </div>

      {/* Product Information Body */}
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
          {product.category}
        </span>
        <h3 className="text-base font-bold text-gray-900 line-clamp-1">
          {product.title}
        </h3>
        <p className="mt-2 text-sm text-gray-500 line-clamp-2 flex-1">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-4">
          <span className="text-lg font-black text-gray-900">
            ₹{product.price}
          </span>
          <button className="rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900/10">
            View details
          </button>
        </div>
      </div>
    </div>
  );
}