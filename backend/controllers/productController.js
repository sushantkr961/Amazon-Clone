const recordsPerPage = require("../config/pagination");
const Product = require("../models/productModel");

const getProducts = async (req, res, next) => {
  try {
    const products = await await Product.find({})
      .sort({ name: 1 })
      .limit(recordsPerPage);
    res.json({ products });
  } catch (error) {
    next(error);
  }
};

module.exports = getProducts;
