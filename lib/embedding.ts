// lib/embedding.ts

import { pipeline } from "@huggingface/transformers";

// 1. Give the embedder a proper type rather than 'any'
let embedder: any = null;

export async function getEmbedder() {
  if (!embedder) {
    // Uses the official upstream Hugging Face pipeline
    embedder = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
  }

  return embedder;
}

/**
 * Generates a 384-dimensional vector embedding for a given text string.
 * @param text The input string (e.g., product title or description)
 * @returns A promise that resolves to an array of numbers representing the vector
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const extractor = await getEmbedder();

  const output = await extractor(text, {
    pooling: "mean",
    normalize: true,
  });

  // 2. Safely extract and cast the multi-dimensional tensor data to a flat number array
  return Array.from(output.data) as number[];
}