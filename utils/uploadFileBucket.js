import { Storage } from "@google-cloud/storage";
import { log } from "console";
import path from 'path'

const keyFilePath = path.resolve('./key.json')

const storage = new Storage({
    keyFilename : "/Users/souvikroy/Desktop/AppCenter-Backend/utils/key.json"
})

const bucketName = "appcenter1"

const bucket = storage.bucket(bucketName)


const uploadFileBucket = async(file)=>{
   try {
    if(!file){
        throw new Error("No file provided");
    }

    console.log("file",file);
    

    const fileName = `release/${file.originalname}`;
    const blob = bucket.file(fileName)
    const blobStream = blob.createWriteStream({
        metadata:{
            contentType: file.mimetype
        }
    })

    return new Promise((resolve, reject) => {
        blobStream.on("error", (err) => reject(err));
        blobStream.on("finish", () => {
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
          resolve(publicUrl);
        });
  
        blobStream.end(file.buffer); // Upload the file buffer
      });

   } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
   }
}

export default uploadFileBucket