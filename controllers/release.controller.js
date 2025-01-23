import ApplicationModel from '../models/Application.js';
import ReleaseModel from '../models/Release.js'
import validateApp from '../utils/validateApp.js';

export const createRelease = async (req, res) => {
    try {
        const { build,version,releaseNote } = req.body
        
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
        applicationId : appId
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