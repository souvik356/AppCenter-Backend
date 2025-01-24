import jwt from 'jsonwebtoken'
import UserModel from '../models/User.js'
import dotenv from 'dotenv'
dotenv.config()

const UserAuth = async(req,res,next)=>{
    try {
        // console.log(req);
        const accessToken  = req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1]
        //  console.log(req.cookies.accessToken);
        if(!accessToken){
            return res.status(401).json({
                message : "Please log in",
                error : true,
                success : false
            })
        }

         const decodedData =  jwt.verify(accessToken,process.env.SECRET_KEY)
        //  console.log(decodedData);   
        const {userId} = decodedData
        // console.log(userId);
        const user = await UserModel.findById(userId)
        req.user = user
        // console.log(user);
        next()
    } catch (error) {
        res.status(500).json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}

export default UserAuth