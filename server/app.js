const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const User = require("../server/model/user");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: ".env",
  });
}
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "http://localhost:5173",
      "https://m.stripe.network",
      "http://127.0.0.1:5173",
    ],
    credentials: true,
  })
);
app.use("/", express.static(path.join(__dirname, "./uploads")));
app.get("/", (req, res) => {
  res.send("Hello world!");
});

// Serve static files from the "public" directory (if you have any)
// app.use(express.static(path.join(__dirname, "public")));

// Use Routes
app.use("/api/v1/user", require("./controllers/user"));
app.use("/api/v1/events", require("./routes/eventRoutes"));
app.use("/api/v1/booking", require("./routes/bookingRoutes"));
app.use("/api/v1/payment", require("./controllers/payment"));

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = app;
