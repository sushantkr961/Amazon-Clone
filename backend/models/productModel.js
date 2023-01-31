const mongoose = require("mongoose");
const Review = require("./reviewModel");

const imageSchema = mongoose.Schema({
  path: { type: String, required: true },
});

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
    },
    reviewsNumber: {
      type: Number,
    },
    sales: {
      type: Number,
      default: 0,
    },
    attrs: [
      {
        key: {
          type: String,
        },
        value: {
          type: String,
        },
      },
    ],
    images: [imageSchema],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Review,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// this is for the search field when anyone search it comes here
productSchema.index(
  { name: "text" },
  { description: "text" },
  { name: "TextIndex" }
);
// 1 means ascending(A-Z)
productSchema.index({ "attrs.key": 1, "attrs.value": 1 });
// -1 means descending(Z-A)
productSchema.index({ name: -1 });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
