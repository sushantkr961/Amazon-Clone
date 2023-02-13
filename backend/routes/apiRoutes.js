const express = require("express");

const app = express();

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

module.exports = app;
