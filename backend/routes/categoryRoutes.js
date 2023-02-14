const express = require("express");
const {
  getCategories,
  postCategory,
  deleteCategory,
  saveAttr,
} = require("../controllers/categoryController");
const {
  verifyIsLoggedIn,
  verifyisAdmin,
} = require("../middleware/verifyAuthToken");
const router = express.Router();

router.get("/", getCategories);

// routes below this line need to be logged in and isAdmin
router.use(verifyIsLoggedIn);
router.use(verifyisAdmin);
router.post("/", postCategory);
router.delete("/:category", deleteCategory);
router.post("/attr", saveAttr);

module.exports = router;
