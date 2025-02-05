import uploadFileLocal from "../utils/uploadFileLocal.js";
import dotenv from 'dotenv'
dotenv.config()

const uploadFileController = async (req, res) => {
  try {
    const file = req.file;

    // Check if file exists
    if (!file) {
      return res.status(400).json({
        message: 'No file uploaded',
        error: true,
        success: false,
      });
    }

    // Call your local upload function
    const uploadedFile = await uploadFileLocal(file);

    // Construct the file URL
    const fileUrl = `${process.env.BACKEND_URL || 'http://localhost:8000'}/uploads/${file.originalname}`;

    // Return success response
    return res.json({
      message: 'File uploaded successfully',
      data:  fileUrl ,
      success: true,
      error: false,
    });

  } catch (error) {
    // Log the error for debugging
    console.error('Error uploading file:', error);

    // Return error response
    return res.status(500).json({
      message: error.message || 'Internal server error',
      error: true,
      success: false,
    });
  }
};

export default uploadFileController;