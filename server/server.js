import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";

const app = express();
dotenv.config();

app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running on port 8000");
});

connectDB(); 
