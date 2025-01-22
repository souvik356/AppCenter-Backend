import uploadFileFirebase from "../utils/uploadFileFirebase.js";

const uploadFileController = async(req,res)=>{
    try {
      const file = req.file
      console.log(file);

      if (!file) {
        return res.status(400).json({
            message: 'No file uploaded',
            error: true,
            success: false
        });
    }
  
      const uploadFile = await uploadFileFirebase(file)
      console.log("upload file",uploadFile);
      
      
      return res.json({
        message : 'file uploaded successfully',
        data: uploadFile,
        success : true,
        error: false
      })
      
    } catch (error) {
      return res.status(500).json({
          message : error.message || error,
          error: true,
          success : true
      })
    }
  }
  
  export default uploadFileController