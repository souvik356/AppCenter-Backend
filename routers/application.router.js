import express from 'express'
import UserAuth from '../middleware/UserAuth.js'
import { getApplication, registerApplication } from '../controllers/application.controller.js'

const applicationRouter = express.Router()

applicationRouter.post('/registerApplication',UserAuth,registerApplication)
applicationRouter.get('/getApplication',UserAuth,getApplication)

export default applicationRouter