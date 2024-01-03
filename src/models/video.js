import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: String, //-title: {type:String} 을 줄여 놓은 것
  description: String,
  createdAt: Date,
  hashtags: [{ type: String }],
  meta: {
    views: Number,
    rating: Number,
  },
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
