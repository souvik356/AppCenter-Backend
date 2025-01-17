import express from 'express'
import { loginUserController, logOutController, registerUserController } from '../controllers/user.controller.js'
import UserAuth from '../middleware/UserAuth.js'

const userRouter = express.Router()

userRouter.post('/register',registerUserController)
userRouter.post('/login',loginUserController)
userRouter.post('/logout',UserAuth,logOutController)

export default userRouter