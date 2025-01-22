import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

// Set up Multer to use Cloudinary storage
const storage = multerStorageCloudinary({
  cloudinary: cloudinary,
  folder: 'app-releases', // Folder in Cloudinary
  allowedFormats: ['apk', 'aab', 'ipa'], // Allow specific formats (e.g., APK)
});

const upload = multer({ storage: storage });
