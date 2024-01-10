import mongoose from "mongoose";

/* hashtags를 가공하는 방법 2
export function makeHashtags(potato) {
  return potato.split(",").map((word) => (word.trim().startsWith("#") ? `#${word.trim().replace(/#/g, "")}` : `#${word.trim()}`));
}
*/

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 }, //-title: {type:String} 을 줄여 놓은 것
  description: { type: String, required: true, trim: true, minLength: 10 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
});

//hashtags를 가공하는 방법 1
//middleWare는 Video model을 만들기 전에 작성
//this는 저장하고자 하는 문서
/*
videoSchema.pre("save", async function () {
  console.log(this.hashtags[0].split(","));
  this.hashtags = this.hashtags[0]
    .split(",")
    .map((potato) => (potato.trim().startsWith("#") ? `#${potato.trim().replace(/#/g, "")}` : `#${potato.trim()}`));
});
*/

//hashtags를 가공하는 방법 3
videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags.split(",").map((word) => (word.trim().startsWith("#") ? `#${word.trim().replace(/#/g, "")}` : `#${word.trim()}`));
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
