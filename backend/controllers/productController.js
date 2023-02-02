const recordsPerPage = require("../config/pagination");
const Product = require("../models/productModel");

const getProducts = async (req, res, next) => {
  try {
    let query = {};
    let queryCondition = false;

    let priceQueryCondition = {};
    if (req.query.price) {
      queryCondition = true;
      priceQueryCondition = { price: { $lte: Number(req.query.price) } };
    }

    let ratingQueryCondition = {};
    if (req.query.rating) {
      queryCondition = true;
      ratingQueryCondition = { rating: { $in: req.query.rating.split(",") } };
    }

    let categoryQueryCondition = {};
    const categoryName = req.params.categoryName || "";
    if (categoryName) {
      queryCondition = true;
      let a = categoryName.replaceAll(",", "/");
      var reqExpression = new RegExp("^" + a);
      categoryQueryCondition = { category: reqExpression };
    }
    // filter category
    if (req.query.category) {
      queryCondition = true;
      let a = req.query.category.split(",").map((item) => {
        if (item) return new RegExp("^" + item);
      });
      categoryQueryCondition = {
        category: { $in: a },
      };
    }

    // filter by attributes i.e color,ram
    let attrsQueryCondition = []; //array because more than one option
    if (req.query.attrs) {
      // attrs = RAM-1TB-2TB-4TB,color-blue-red
    }

    if (queryCondition) {
      query = {
        $and: [
          priceQueryCondition,
          ratingQueryCondition,
          categoryQueryCondition,
        ],
      };
    }

    // pagination
    const pageNum = Number(req.query.pageNum) || 1;

    // sort by name,price,etc
    let sort = {};
    const sortOption = req.query.sort || "";
    if (sortOption) {
      let sortOpt = sortOption.split("_");
      sort = { [sortOpt[0]]: Number(sortOpt[1]) };
      // console.log(sort);
    }

    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .skip(recordsPerPage * (pageNum - 1))
      .sort(sort)
      .limit(recordsPerPage);

    res.json({
      products,
      pageNum,
      paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getProducts;
