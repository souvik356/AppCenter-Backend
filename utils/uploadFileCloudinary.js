import { v2 as cloudinary } from 'cloudinary';
import  dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_SECRET_KEY
})

const uploadFileCloudinary = async (file) => {
    const buffer = file?.buffer || Buffer.from(await file.arrayBuffer());

    const uploadFile = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
              folder: "release", 
              resource_type: "auto", 
            },
            (error, uploadResult) => {
              if (error) {
                reject(error); 
              } else {
                resolve(uploadResult); 
              }
            }
          ).end(buffer);
    });

    return uploadFile;
};

export default uploadFileCloudinary