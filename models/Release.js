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
  applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
  }
}, { timestamps: true });


const ReleaseModel = mongoose.model("Release", releaseSchema);

export default ReleaseModel;
