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
    if(!['jave','kotlin','react-native'].includes(platformType)){
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