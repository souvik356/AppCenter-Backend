import express from 'express'
import UserAuth from '../middleware/UserAuth.js'
import { createRelease, getRelease } from '../controllers/release.controller.js'

const releaseRouter = express.Router()


releaseRouter.post('/registerRelease/:appId',UserAuth,createRelease)
releaseRouter.get('/getRelease/:appId',UserAuth,getRelease)

export default releaseRouter  