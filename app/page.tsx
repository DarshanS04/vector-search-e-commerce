// app/page.tsx
"use client";

import { useState, useEffect } from "react";

interface Product {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  url: string;
  score?: number;
}

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [initialCatalog, setInitialCatalog] = useState<Product[]>([]); // Client-side cache for full catalog
  const [loading, setLoading] = useState(false);

  // 1. INITIAL MOUNT EFFECT: Calls the brand-new standalone /api/products route once
  useEffect(() => {
    const loadInitialCatalog = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
          setInitialCatalog(data.products); // Save a backup copy to prevent redundant API queries later
        }
      } catch (error) {
        console.error("Failed to load initial catalog from products API:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialCatalog();
  }, []); // Empty dependency array ensures this runs exactly once on mount

  // 2. SEARCH DEBOUNCE EFFECT: Handles dynamic vector queries exclusively
  // useEffect(() => {
  //   // If the query is empty or cleared, immediately roll back to the full catalog cache
  //   if (query.trim() === "") {
  //     setProducts(initialCatalog);
  //     return;
  //   }

  //   const delayDebounceFn = setTimeout(async () => {
  //     setLoading(true);
  //     try {
  //       const params = new URLSearchParams({ q: query });
  //       const res = await fetch(`/api/search?${params.toString()}`);
  //       const data = await res.json();

  //       if (data.success) {
  //         setProducts(data.products); // Overwrite listing UI with vector search results
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch search results from search API:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }, 300); // Waits 300ms after user stops typing to save transformer execution overhead

  //   return () => clearTimeout(delayDebounceFn);
  // }, [query, initialCatalog]); // Re-runs cleanly when the user inputs data or cache loads



  // 2. SEARCH DEBOUNCE EFFECT: Handles dynamic vector queries exclusively
  useEffect(() => {
    // If the input box is cleared, instantly reset to the cached storefront layout
    if (query.trim() === "") {
      setProducts(initialCatalog);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ q: query });
        const res = await fetch(`/api/search?${params.toString()}`);
        const data = await res.json();

        if (data.success) {
          // Explicitly sort products in descending order of their match score (highest score first)
          const sortedProducts = [...data.products].sort((a, b) => {
            const scoreA = a.score ?? 0;
            const scoreB = b.score ?? 0;
            return scoreB - scoreA; // Descending sort logic
          });

          setProducts(sortedProducts); // Overwrite listing UI with perfectly sorted results
        }
      } catch (error) {
        console.error("Failed to fetch search results from search API:", error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, initialCatalog]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar / Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-indigo-600">eCommerce</span>
              <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 border border-indigo-100">
                AI Vector Search
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Search Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-gray-900 via-indigo-950 to-indigo-600 bg-clip-text text-transparent">
            Intelligent Semantic Search
          </h1>
          <p className="mt-4 text-base text-gray-600">
            Type anything naturally. Try describing a concept, feeling, or utility (e.g., <span className="italic font-medium">"something protecting my eyes from the bright sun"</span>).
          </p>

          {/* Search Input Bar */}
          <div className="mt-8 relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search products conceptually..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 bg-white py-4 pl-12 pr-4 text-gray-900 shadow-sm transition-all placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
            </div>
            {loading && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
              </div>
            )}
          </div>
        </div>

        {/* Products Section Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-5 mb-8">
          <h2 className="text-xl font-bold tracking-tight text-gray-900">
            {query ? `Search Results for "${query}"` : "All Catalog Products"}
          </h2>
          <p className="text-sm text-gray-500">{products.length} items found</p>
        </div>

        {/* Products Grid Layout */}
        {products.length === 0 && !loading ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-300">
            <p className="text-gray-500 font-medium">No matches found for your query.</p>
            <p className="text-gray-400 text-sm mt-1">Try altering your description phrasing.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product._id} className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                {/* Product Image Placeholder Container */}
                <div className="aspect-h-1 aspect-w-1 w-full bg-gray-100 p-4 sm:aspect-none h-48 flex items-center justify-center overflow-hidden border-b border-gray-100">
                  <img
                    src={
                      product.url && product.url.includes("images.unsplash.com")
                        ? product.url // Use if it's already a direct raw source link
                        : `https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80` // Fallback clean image
                    }
                    alt={product.title}
                    className="h-full w-full object-cover object-center transition-all group-hover:scale-105"
                  />
                  {/* AI Match Score Badge (Only visible when searching) */}
                  {product.score !== undefined && (
                    <span className="absolute top-3 right-3 rounded-md bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm">
                      Match: {Math.round(product.score * 100)}%
                    </span>
                  )}
                </div>

                {/* Content */}
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
            ))}
          </div>
        )}
      </main>
    </div>
  );
}