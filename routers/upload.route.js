import { Router } from "express";
import UserAuth from "../middleware/UserAuth.js";
import upload from "../middleware/multer.js";
import uploadFileController from "../controllers/uploadFile.controller.js";

const uploadFileRouter = Router()

uploadFileRouter.post('/uploadFile',UserAuth,upload.single("file"),uploadFileController)

export default uploadFileRouter