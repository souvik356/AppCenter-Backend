import ApplicationModel from '../models/Application.js';
import ReleaseModel from '../models/Release.js'
import validateApp from '../utils/validateApp.js';

export const createRelease = async (req, res) => {
    try {
        const { build,version,releaseNote,fileSize,fileExtension } = req.body
        
        const appId = req.params.appId

    if(!build || !version || !releaseNote){
        return res.status(400).json({
            message : "provide all fields",
            error : true,
            success : false
        })
    }

    const validateUrl = validateApp(build)

    if(!validateUrl){
        return res.status(400).json({
            message : "invalid file",
            error : true,
            success : false
        })
    }

    const lastRelease = await ReleaseModel.findOne({applicationId: appId}).sort({buildNumber :-1}).exec()

    const buildNumber = lastRelease ? lastRelease.buildNumber + 1 : 1

    const release = new ReleaseModel({
        build,
        version,
        buildNumber,
        releaseNote,
        applicationId : appId,
        fileSize,
        fileExtension
    })

    const releaseData = await release.save()

    await ApplicationModel.findByIdAndUpdate(appId,{ $push : {release : releaseData._id}},{ new: true })
    

    return res.json({
        message : "Releases are uploaded",
        data: releaseData,
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

};

export const getRelease = async (req,res) => {
    try {
        const appId = req.params.appId
        // console.log(appId)
        if(!appId){
            return res.status(400).json({
                message: 'provide appId',
                error : true,
                success : false
            })
        }

        const release = await ReleaseModel.find({applicationId : appId})

        return res.json({
            message : "All the releases are below",
            data: release,
            error : false,
            success : true
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error : true,
            success : false
        })
    }
}

export const deleteRelease = async(req,res) =>{
    try {
        const releaseId = req.body

        if(!releaseId){
            return res.status(400).json({
                message : "please provide releaseId",
                error : true,
                success : false
            })
        }

        const isReleaseIdInDb = await ReleaseModel.findById(releaseId)
        console.log('releaseId',isReleaseIdInDb._id);
        if(!isReleaseIdInDb){
            return res.status(400).json({
                message : "invalid releaseId",
                error : true,
                success : false
            })
        }

       const deleteRelease = await ReleaseModel.findByIdAndDelete(releaseId)
       
       await ApplicationModel.findByIdAndUpdate({_id : isReleaseIdInDb.applicationId},{$pull: {release : releaseId}})
       console.log("applicationId",isReleaseIdInDb.applicationId)
       return res.json({
        message : "release deleted successfully",
        data : deleteRelease,
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


// delete for application 
// delete for release
