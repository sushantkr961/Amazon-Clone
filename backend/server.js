const express = require("express");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 8080;
const apiRoutes = require("./routes/apiRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(cookieParser());

app.get("/", async (req, res) => {
  res.json({ message: "API running..." });
});

// mongoDB connection
require("./config/db");

app.use("/api", apiRoutes);

// custom error handler
// when the app is in development then all the error showed when it is in production no error will shown due to security reasons
app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.error(error);
  }
  next(error);
});
app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  } else {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
