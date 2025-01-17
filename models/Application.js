import mongoose, { Schema } from "mongoose";

const applicationSchema = mongoose.Schema({
    appName:{
        type: String,
        minLength: 2,
        maxLength: 50,
        required: true
    },
    appIcon : {
        type: String,
        default:'https://cdn-icons-png.freepik.com/256/1077/1077114.png?semt=ais_hybrid',
    },
    releaseType : {
        type: String,
        validate(value){
            if(!['alpha', 'beta', 'enterprise','custom', 'production', 'store'].includes(value)){
               throw new Error('Invalid release type')
            }
        }
    },
    osType : {
        type: String,
        validate(value){
            if(!['ios','android'].includes(value)){
               throw new Error('invalid os type')
            }
        }
    },
    platformType : {
        type: String,
        validate(value){
            if(!['jave','kotlin','react-native'].includes(value)){
                throw new Error('invalid platform type')
            }
        }
    },
    release : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Release'
        }
    ],
    user:{
        type: Schema.Types.ObjectId,
        ref : 'User'
    }
},
{ timestamps: true }
)

const ApplicationModel = mongoose.model('Application',applicationSchema)

export default ApplicationModel