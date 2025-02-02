import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { configDotenv } from "dotenv";

configDotenv();

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.cloudinary_API,
    api_secret: process.env.cloudinary_Secret
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "Hungry Chef",
        allowed_formats: ["jpg", "png", "jpeg"],
    }
})

const upload = multer({storage});

export default upload;