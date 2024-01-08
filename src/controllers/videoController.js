import Video from "../models/video";

export const home = async (req, res) => {
  const videos = await Video.find({});
  //console.log("videos:", videos);
  return res.render("home", { pageTitle: "Home", videos }); //home.pug를 유저에게 보여준다
};
export const watch = (req, res) => {
  //console.log(req.params); //url에 id변수가 있으니 params를 찍어볼 수 있다
  const { id } = req.params; //ES6 최신문법(아래와같음)
  //  const id = req.params.id;
  return res.render("watch", { pageTitle: `Watching` });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("edit", { pageTitle: `Editing` });
};
export const postEdit = (req, res) => {
  console.log(req.body); //form body / input 값에 name을 넣어주어야 값이 넘어온다! 중요!
  const { id } = req.params;
  const { title } = req.body;
  videos[id - 1].title = title; // DB title update
  return res.redirect(`/video/${id}`);
};
export const deleteVideo = (req, res) => res.send("video delete", { pageTitle: "Video Delete" });
export const getUpload = (req, res) => res.render("upload", { pageTitle: "Video Upload" });
export const postUpload = async (req, res) => {
  //console.log(req.body);
  const { title = req.body.uploadVideoTitle, description, hashtags } = req.body;
  //console.log(title, description, hashtags);
  const video = new Video({
    title, // = title: title
    description,
    //createdAt: Date.now(),
    hashtags: hashtags.split(",").map((potato) => `#${potato}`),
    meta: { views: 0, rating: 0 },
  });
  try {
    await video.save();
  } catch (error) {
    // console.log(error);
    return res.render("upload", { pageTitle: "Video Upload", errorMessage: error._message });
  }
  /*
  위의 new object 생성 후 save하는 부분을 아래와 같이 사용할 수 있다
  await Video.create({
    title, // = title: title
    description,
    createdAt: Date.now(),
    hashtags: hashtags.split(",").map((potato) => `#${potato}`),
    meta: { views: 0, rating: 0 },
  })
   */
  return res.redirect("/");
  //return res.render("upload", { pageTitle: "Video Upload" });
};
