const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();
const PORT = 8080;
const apiRoutes = require("./routes/apiRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

app.get("/", async (req, res) => {
  res.json({ message: "API running..." });
});

// mongoDB connection
require("./config/db");

app.use("/api", apiRoutes);

// custom error handler
app.use((error, req, res, next) => {
  console.error(error);
  next(error);
});
app.use((error, req, res, next) => {
  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
