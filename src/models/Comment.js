import { Schema, model, Types } from "mongoose";

const commentSchema = new Schema(
  {
    post: { type: Types.ObjectId, ref: "post", required: true },
    author: { type: Types.ObjectId, ref: "user", required: true },
    text: { type: String, required: true, trim: true },
  },
  { timestamps: true, versionKey: false }
);

export default model("comment", commentSchema);
