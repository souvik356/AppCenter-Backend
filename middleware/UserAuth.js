import jwt from 'jsonwebtoken'
import UserModel from '../models/User.js'
import dotenv from 'dotenv'
dotenv.config()

const UserAuth = async(req,res,next)=>{
     const { accessToken } = req.cookies
    //  console.log(accessToken);
     const decodedData =  jwt.verify(accessToken,process.env.SECRET_KEY)
    //  console.log(decodedData);   
    const {userId} = decodedData
    // console.log(userId);
    const user = await UserModel.findById(userId)
    req.user = user
    // console.log(user);
    next()
}

export default UserAuth