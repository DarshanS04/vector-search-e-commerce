// models/Product.ts

import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    title: String,
    description: String,
    category: String,
    price: Number,
    url: String,

    embeddings: {
      type: [Number],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);