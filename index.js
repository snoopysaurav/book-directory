import express from "express";
import dotenv from "dotenv";
dotenv.config();
import router from "./routes/books.js";
import notFound from "./middlewares/not-found.js";
import connectDB from "./db/connect.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";

// configures
const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use("/", express.static("public"));
app.use(express.json());

// Route
app.use("/api/v1/books", router);
app.use(notFound);

// Error Handler
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(
      PORT,
      console.log(`Stated running at http://localhost:${PORT} ....`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
