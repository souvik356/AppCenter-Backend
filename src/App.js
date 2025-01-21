import express from 'express'
import connectDb from '../Database/Database.js';
import dotenv from 'dotenv'
import userRouter from '../routers/user.router.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

dotenv.config()

    const app = express()

    app.use(cors({
        credentials: true,
        origin: process.env.FRONTEND_URL,
        allowedHeaders: ['Content-Type', 'Authorization'],
        methods :['GET','PATCH','PUT','DELETE','POST'],
        exposedHeaders: ['Authorization'] 
    }))

    app.use(express.json())
    app.use(cookieParser()) 

    app.use('/api/user',userRouter)



    connectDb().then(()=>{
       console.log("Database connected successfully");
       app.listen(process.env.PORT_NUMBER,()=>{
        console.log(`Server is connected to ${process.env.PORT_NUMBER}`);
       })
    }).catch((error)=>{
     console.log(error.message || error);
    })

//     userSchema: - name, email, password, application
// what i am thinking that in userSchema i am incuding name email passowrd and project 
// and in projectSchema i will include the name of the project type of platform which is android ios flutter or react native, description of project ,user reference to the project who own and Api key for sdk integration and sdkVersion 

// os: andorid/ ios
// platform :- react-

// alpha beta enterprise custom production store

//release schema :-