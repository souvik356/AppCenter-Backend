import express from 'express'
import UserAuth from '../middleware/UserAuth.js'
import { deleteApplication, getApplication, registerApplication } from '../controllers/application.controller.js'

const applicationRouter = express.Router()

applicationRouter.post('/registerApplication',UserAuth,registerApplication)
applicationRouter.get('/getApplication',UserAuth,getApplication)
applicationRouter.delete('/deleteApplication',UserAuth,deleteApplication)

export default applicationRouter