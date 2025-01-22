import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "./firebase.js"

const uploadFileFirebase = async(file)=>{
   try {
    if(!file){
        throw new Error("No file provided")
       }

       const storageRef = ref(storage,`release/${file.originalname}`)

       const uploadTask =uploadBytesResumable(storageRef, file.buffer,{
        contentType: file.mimetype,
       })

       uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
        },
        (error) => {
            throw error;
        }
    )

    await new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            null,
            (error) => reject(error),
            () => resolve()
        );
    });

    const fileURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("File uploaded successfully:", fileURL);

        return fileURL

   } catch (error) {
    console.error("Error uploading file:", error);
        throw error;
   }

}

export default uploadFileFirebase