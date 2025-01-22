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
      required: true
  },
  releaseNote: {
      type: String,
      required: true
  },
  application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      required: true
  }
}, { timestamps: true });


// Middleware to auto-increment `buildNumber` for the same `applicationId`
releaseSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastRelease = await mongoose
      .model("Release")
      .findOne({ applicationId: this.applicationId })
      .sort({ buildNumber: -1 }); // Find the release with the highest buildNumber

    if (lastRelease) {
      this.buildNumber = lastRelease.buildNumber + 1; // Increment buildNumber
    } else {
      this.buildNumber = 1; // First build for this applicationId
    }
  }
  next();
});

const ReleaseModel = mongoose.model("Release", releaseSchema);

export default ReleaseModel;
