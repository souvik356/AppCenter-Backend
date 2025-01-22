import ReleaseModel from '../models/Release.js'; // Assuming you have a Release model
import ApplicationModel from '../models/Application.js'; // Assuming you have an Application model
import { upload } from '../utils/uploadFileCloudinary.js';

export const createRelease = async (req, res) => {
    try {
        // Use the multer upload middleware to handle the file upload
        const uploadFile = upload.single('build'); // 'build' is the key for file in form-data
        
        uploadFile(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: "File upload error", error: err.message });
            }

            // Once the file is uploaded to Cloudinary, retrieve the file's URL
            const buildFileUrl = req.file.path; // Cloudinary URL of the uploaded file
            const { appName, releaseType, version, buildNumber, releaseNote, applicationId } = req.body;

            // Validation to make sure required fields are provided
            if (!appName || !releaseType || !version || !buildNumber || !releaseNote || !applicationId) {
                return res.status(400).json({
                    message: "Please provide all required fields",
                    success: false,
                    error: true,
                });
            }

            // Create a new Release object with the data
            const newRelease = new ReleaseModel({
                appName,
                releaseType,
                version,
                buildNumber,
                releaseNote,
                build: buildFileUrl, // Store the Cloudinary file URL
            });

            // Save the new release to the database
            const savedRelease = await newRelease.save();

            // After saving the release, update the related Application to add the new release to the 'releases' array
            const application = await ApplicationModel.findById(applicationId);
            if (!application) {
                return res.status(404).json({
                    message: "Application not found",
                    success: false,
                    error: true,
                });
            }

            // Add the new release to the application's releases array
            application.releases.push(savedRelease._id);
            await application.save();

            return res.status(200).json({
                message: "Release created and associated with application successfully",
                data: savedRelease,
                success: true,
                error: false,
            });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message || "Internal server error",
            success: false,
            error: true,
        });
    }
};
