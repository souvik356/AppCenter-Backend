import mongoose, { Schema } from "mongoose";

const releaseSchema = mongoose.Schema({
  build: {
      type: String, // APK, AAB, IPA file
      required: true
  },
  version: {
      type: String,
      required: true
  },
  buildNumber: {
      type: Number, // Increment this number with each new release
  },
  releaseNote: {
      type: String
  },
  fileSize:{ 
      type : Number
  },
  fileExtension :{
      type : String,
      validate(value){
        if(!['.apk','.abb','.ipa'].includes(value)){
            throw new Error('invalid file extension')
        }
      }
  },
  applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
  }
}, { timestamps: true });


const ReleaseModel = mongoose.model("Release", releaseSchema);

export default ReleaseModel;
