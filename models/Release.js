import mongoose, { version } from "mongoose";

const relaseSchema = mongoose.Schema({
    build:{
        type: String,
        required: true,
        validate: {
            validator: function (v) {
              return /\.(apk|aab|ipa)$/i.test(v); // Ensure valid file extensions
            },
            message: 'Build must be an APK, AAB, or IPA file.',
        }
    },
    version : {
        type: String,
        required : true,
        match: /^\d+\.\d+\.\d+$/, // Semantic versioning (e.g., "1.0.0")
    },
    buildNumber : {
        type: Number,
        default : 0
    },
    releaseNote : {
        type: String,
        required: true,
        maxLength: 50
    }   
},
{
    timeStamps : true
}
)

const ReleaseModel = mongoose.model('Release',relaseSchema)

export default ReleaseModel