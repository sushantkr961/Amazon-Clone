const Product = require("../models/productModel");

const getProducts = (req, res) => {
  res.send("get all producsts");
};

module.exports = getProducts;
