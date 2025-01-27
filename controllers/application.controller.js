import ApplicationModel from "../models/Application.js"
import UserModel from "../models/User.js"

export const registerApplication = async (req,res) => {
    try {
        const { appName,appIcon, releaseType,osType,platformType,release} = req.body
    const loggedInUser = req.user

    if(!appName || !releaseType || !osType || !platformType ){
        return res.status(400).json({
            message : "Provide required fields",
            success : false,
            error : true
        })
    }
    if(!["Alpha","Beta","Enterprise","Production","Store"].includes(releaseType)){
        return res.status(400).json({
            message : "Invalid release type",
            success : false,
            error : true
        })
    }
    if(!['ios','android'].includes(osType)){
        return res.status(400).json({
            message : "Invalid os type",
            success : false,
            error : true
        })
    }
    if(!['java','kotlin','react-native'].includes(platformType)){
        return res.status(400).json({
            message : "Invalid platform type",
            success : false,
            error : true
        })
    }

    const appData = new ApplicationModel({
        appName,
        releaseType,
        osType,
        platformType,
        user : loggedInUser._id
    })

    const saveAppData = await appData.save()

    await UserModel.findByIdAndUpdate(loggedInUser._id,
        { $push: {applications : saveAppData._id}},
        { new :true }
    )

    return res.json({
        message : "Application is saved successfully",
        data : saveAppData,
        error: false,
        success : true,
    })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getApplication = async (req,res) => {
    try {
        const loggedInUser = req.user
        // console.log(loggedInUser)
        const application = await ApplicationModel.find({user : loggedInUser._id}).populate("user","name email")

        return res.json({
            message : "All application are here :-",
            data : application,
            success : true,
            error : false
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const deleteApplication = async (req,res) => {
    try {
        const appId = req.body
        if(!appId){
            return res.status(400).json({
                message : "please provide appId",
                success : false,
                error : true
            })
        }

        const checkInDb = await ApplicationModel.findById(appId)

        if(!checkInDb){
            return res.status(400).json({
                message : "Application not found",
                success : false,
                error : true
            })
        }

        if(!(checkInDb.release.length === 0)){
            return res.status(400).json({
                message : "Please delete the releases then drop the application",
                success : false,
                error : true
            })
        }

        const deleteApplication = await ApplicationModel.findByIdAndDelete(appId)

        return res.json({
            message : "Application deleted successfully",
            data : deleteApplication,
            success : true,
            error : false
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}