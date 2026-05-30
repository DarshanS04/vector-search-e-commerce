// app/api/seed-data/route.ts

import { products } from "@/data/products";
import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectDB } from "@/lib/db";
import { generateEmbedding } from "@/lib/embedding";

export async function GET() {
  try {
    await connectDB();

    // 1. Clear out old products
    await Product.deleteMany({});

    const productsWithEmbeddings = [];

    // 2. CRITICAL FIX: Run sequentially using a for...of loop instead of Promise.all
    // This processes one product at a time so your CPU doesn't choke
    for (const product of products) {
      const text = `
        ${product.title}
        ${product.description}
        ${product.category}
      `.trim();

      console.log(`Generating embedding for: ${product.title}`);
      const embedding = await generateEmbedding(text);

      productsWithEmbeddings.push({
        ...product,
        embeddings: embedding,
      });
    }

    // 3. Insert everything bulk into MongoDB
    await Product.insertMany(productsWithEmbeddings);

    return NextResponse.json({
      success: true,
      inserted: productsWithEmbeddings.length,
    });
  } catch (error: any) {
    console.error("Seeding error:", error);

    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}