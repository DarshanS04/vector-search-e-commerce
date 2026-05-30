// app/api/search/route.ts

import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectDB } from "@/lib/db";
import { generateEmbedding } from "@/lib/embedding";

export async function GET(request: Request) {
  try {
    // 1. Extract the search term from the URL query params (e.g., /api/search?q=something)
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json({ success: true, products: [] });
    }

    // 2. Establish database connection
    await connectDB();

    // 3. Turn the plain text search term into a 384-dimensional vector array
    console.log(`Generating embedding for user query: "${query}"`);
    const queryEmbedding = await generateEmbedding(query);

    // 4. Query MongoDB using an aggregation pipeline built for Vector Search
    const results = await Product.aggregate([
      {
        $vectorSearch: {
          index: "vector_index",       // Must match your Atlas index name exactly
          path: "embeddings",          // The field name inside your MongoDB document
          queryVector: queryEmbedding,  // The mathematical array we just generated
          numCandidates: 100,          // How many close matches to look at initially
          limit: 10,                   // Total number of top documents to return
        },
      },
      {
        // Optional: Pick the fields you want to send back and include the match score
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          category: 1,
          price: 1,
          url: 1,
          score: { $meta: "vectorSearchScore" }, // Shows how strong the match is
        },
      },
    ]);

    return NextResponse.json({ success: true, products: results });
  } catch (error: any) {
    console.error("Vector Search API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Search Error" },
      { status: 500 }
    );
  }
}