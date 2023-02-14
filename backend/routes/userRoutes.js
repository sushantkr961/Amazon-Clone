const express = require("express");
const {
  getUsers,
  registerUser,
  loginUser,
  updateUserProfile,
  getUserProfile,
  writeReview,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const {
  verifyIsLoggedIn,
  verifyisAdmin,
} = require("../middleware/verifyAuthToken");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// user logged in routes
router.use(verifyIsLoggedIn);
router.put("/profile", updateUserProfile);
router.get("/profile/:id", getUserProfile);
router.post("/review/:productId", writeReview);

// admin routes
// below this line needs to be logged in and isAdmin
router.use(verifyisAdmin);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
