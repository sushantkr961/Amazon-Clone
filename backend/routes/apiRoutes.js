const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");
const userRoutes = require("./userRoutes");
const orderRoutes = require("./orderRoute");

// product route
app.use("/products", productRoutes);
// categories route
app.use("/categories", categoryRoutes);
// user route
app.use("/users", userRoutes);
// order route
app.use("/orders", orderRoutes);
// for get token
app.get("/get-token", (req, res) => {
  try {
    const accessToken = req.cookies["access_token"];
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    return res.json({ token: decoded.name, isAdmin: decoded.isAdmin });
  } catch (error) {
    return res.status(401).send("Unauthorized. Invalid Token");
  }
});
// logout route: after logout data in storage and redux should be cleared
app.get("/logout", (req, res) => {
  return res.clearCookie("access_token").send("access token cleared");
});

module.exports = app;
