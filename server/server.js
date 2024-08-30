const app = require("./app");
const connectDB = require("./db/db");

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server for handling uncaught exception`);
});

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: ".env",
  });
}

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URI);
    app.listen(process.env.PORT || 8080, () =>
      console.log("Server started on port 8080")
    );
  } catch (error) {
    console.log(error);
  }
};
startServer();

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandle promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
