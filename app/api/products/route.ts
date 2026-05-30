// app/api/products/route.ts
import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    await connectDB();

    // Fetch all products, sorting by newest, and excluding heavy embedding arrays
    const products = await Product.find({})
      .select("-embeddings")
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, products });
  } catch (error: any) {
    console.error("Fetch Products Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}