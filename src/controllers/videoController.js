import Video /*, { makeHashtags }*/ from "../models/video";

//HOME
export const home = async (req, res) => {
  const videos = await Video.find({}).sort({ createdAt: "desc" });
  //console.log("videos:", videos);
  return res.render("home", { pageTitle: "Home", videos }); //home.pug를 유저에게 보여준다
};

//WATCH
export const watch = async (req, res) => {
  console.log(req.params); //url에 id변수가 있으니 params를 찍어볼 수 있다
  const { id } = req.params; //ES6 최신문법(아래와같음)
  // const id = req.params.id;
  const videoInfo = await Video.findById(id);
  if (!videoInfo) {
    return res.render("404", { pageTitle: "Video not found" });
  }
  return res.render("watch", { pageTitle: videoInfo.title, videoInfo });
};

//EDIT
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const videoInfo = await Video.findById(id);
  if (!videoInfo) {
    return res.render("404", { pageTitle: "Video not found" });
  }
  return res.render("edit", { pageTitle: `Edit ${videoInfo.title}`, videoInfo });
};
export const postEdit = async (req, res) => {
  //console.log(req.body); //form body / input 값에 name을 넣어주어야 값이 넘어온다! 중요!
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const videoInfo = await Video.exists({ _id: id });
  if (!videoInfo) {
    return res.render("404", { pageTitle: "Video not found" });
  }
  await Video.findByIdAndUpdate(id, {
    title, // = title:title
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/video/${id}`);
};

//DELETE
export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

//UPLOAD
export const getUpload = (req, res) => res.render("upload", { pageTitle: "Video Upload" });
export const postUpload = async (req, res) => {
  //console.log(req.body);
  const { title = req.body.uploadVideoTitle, description, hashtags } = req.body;
  //console.log(title, description, hashtags);
  const video = new Video({
    title, // = title: title
    description,
    //createdAt: Date.now(),
    hashtags: Video.formatHashtags(hashtags),
  });
  try {
    await video.save();
  } catch (error) {
    // console.log(error);
    return res.render("upload", { pageTitle: "Video Upload", errorMessage: error.errors.description });
  }
  /*
  위의 new object 생성 후 save하는 부분을 아래와 같이 사용할 수 있다
  await Video.create({
    title, // = title: title
    description,
    // createdAt: Date.now(),
    hashtags: hashtags.split(",").map((potato) => `#${potato}`),
  })
   */
  return res.redirect("/");
  //return res.render("upload", { pageTitle: "Video Upload" });
};

//SEARCH
export const search = async (req, res) => {
  const { searchTitle } = req.query;
  let videos = [];
  if (searchTitle) {
    videos = await Video.find({ title: { $regex: new RegExp(searchTitle, "i") } }).sort({ createdAt: "desc" });
    /*정규식
    new RegExp(`^${searchTitle}`, "i") 검색어로 시작하는 것만
    new RegExp(`${searchTitle}$`, "i") 검색어로 끝나는 것만 */
  }
  return res.render("search", { pageTitle: "Video Search", videos });
};
