import express from "express";
import dotenv from "dotenv";

import cors from "cors";

import mongoose from "mongoose";

// import multer from "multer";
import connectDB from "./config/database.js";
import router from "./routes/user.routes.js";

// const multer = require("multer");

const app = express();

dotenv.config({
  path: "./.env",
});

app.use(express.json());
app.use(cors());

// Register routes BEFORE starting server
app.use("/api/users", router);

const ServerStart = async () => {
  try {
    await connectDB();
    app.on("error", (err) => {
      console.error("Server error:", err);
    });

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
  }
};

ServerStart();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "/uploads");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });

// const upload = multer({ storage: storage });
