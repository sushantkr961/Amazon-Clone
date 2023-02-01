const express = require("express");
const {
  getCategories,
  postCategory,
  deleteCategory,
  saveAttr,
} = require("../controllers/categoryController");
const router = express.Router();

router.get("/", getCategories);
router.post("/", postCategory);
router.delete("/:category", deleteCategory);
router.post("/attr", saveAttr);

module.exports = router;
