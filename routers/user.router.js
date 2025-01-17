import express from 'express'
import { loginUserController, registerUserController } from '../controllers/user.controller.js'

const userRouter = express.Router()

userRouter.post('/register',registerUserController)
userRouter.post('/login',loginUserController)

export default userRouter