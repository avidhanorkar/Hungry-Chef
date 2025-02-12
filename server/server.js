import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import router from "./routes/router.js";
import cors from "cors";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "https://hungry-chef.vercel.app", 

    methods: "GET,POST,PUT,DELETE, PATCH", 
    credentials: true, 
  })
);

app.use(express.json());
app.use("/api", router);

app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running on port 8000");
});

connectDB();
