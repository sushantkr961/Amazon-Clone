const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require("express");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 8080;
const httpServer = createServer(app);
global.io = new Server(httpServer);

io.on("connection", (socket) => {
  socket.on("client sends message", (msg) => {
    // console.log(msg);
    socket.broadcast.emit("server sends message from client to admin", {
      message: msg,
    });
  });

  socket.on("admin sends message", ({ message }) => {
    socket.broadcast.emit("server sends message from admin to client", message);
  });
});

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

// app.listen(PORT, () => {
//   console.log(`Listening on http://localhost:${PORT}`);
// });
httpServer.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
