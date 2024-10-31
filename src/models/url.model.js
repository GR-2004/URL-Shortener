import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortID: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [{ timeStamp: { type: Number } }],
  },
  { timestamps: true }
);

urlSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 });

export const URL = mongoose.model("URL", urlSchema);
