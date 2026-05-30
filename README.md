# 🛒 vector-search-e-commerce

A modern, high-performance eCommerce storefront built with **Next.js 14+ (App Router)** and **Tailwind CSS**, featuring an intelligent, open-source **Semantic Vector Search Engine** backed by **MongoDB Atlas Vector Search** and local Hugging Face embedding pipelines.

Unlike traditional keyword-matching search bars, this storefront understands user *intent*, *context*, and *conceptual phrases* (e.g., typing *"something protecting my eyes from the bright sun"* dynamically uncovers sunglasses).

---

## ✨ Features

* **⚡ Decoupled Modular Architecture:** Clean separation of concerns with standalone reusable layout components (`Navbar`, `ProductCard`).
* **🧠 Local AI Vector Embeddings:** Zero-cost semantic vector generation utilizing lightweight, open-source transformer models on the backend.
* **🔄 Hybrid Dual-Route Routing Engine:**
    * `/api/products`: Instantly handles broad catalog state synchronization.
    * `/api/search`: Handles real-time, mathematical multi-dimensional geometry calculations.
* **⏳ Intelligent Input Debouncing:** Automated 300ms network throttling prevents database hammer during live input variations.
* **📈 Client-Side Relevance Sorting:** Guarantees strict descending order execution based entirely on vector matching precision metrics (`$meta: "vectorSearchScore"`).
* **🎨 Premium UI/UX:** Responsive grid layout engineered with Tailwind CSS, absolute glassmorphism overlays (`backdrop-blur`), and automatic asset fallbacks for clean rendering.

---

## 🛠️ Tech Stack

* **Frontend Framework:** Next.js (TypeScript Client/Server Components)
* **Styling Engine:** Tailwind CSS
* **Database Engine:** MongoDB Atlas Ecosystem
* **Indexing Architecture:** Atlas Vector Search (using Cosine Similarity metrics)

---

## 📥 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/DarshanS04/vector-search-e-commerce.git
cd vector-search-e-commerce
