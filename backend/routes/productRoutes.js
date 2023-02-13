const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  getBestsellers,
  adminGetProducts,
  adminDeleteProduct,
  adminCreateProduct,
  adminUpdateProduct,
  adminUpload,
  adminDeleteProductImage,
} = require("../controllers/productController");
const {
  verifyIsLoggedIn,
  verifyisAdmin,
} = require("../middleware/verifyAuthToken");

router.get("/category/:categoryName/search/:searchQuery", getProducts); // filter category on search dropdown
router.get("/category/:categoryName", getProducts); // search routes
router.get("/search/:searchQuery", getProducts); // search all of the category
router.get("/", getProducts);
router.get("/get-one/:id", getProductById);
router.get("/bestsellers", getBestsellers); // bestsellers product from category

// admin routes:
router.use(verifyIsLoggedIn);
router.use(verifyisAdmin);
router.get("/admin", adminGetProducts);
router.delete("/admin/:id", adminDeleteProduct);
router.post("/admin", adminCreateProduct);
router.put("/admin/:id", adminUpdateProduct);
router.post("/admin/upload", adminUpload); // uploading product image
router.delete("/admin/image/:imagePath/:productId", adminDeleteProductImage);

module.exports = router;
