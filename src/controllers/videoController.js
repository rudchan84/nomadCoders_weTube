let videos = [
  { title: "First Video", rating: 5, comments: 12, createAt: "22 minutes ago", views: 95, id: 1 },
  { title: "Second Video", rating: 4, comments: 3, createAt: "7 minutes ago", views: 23, id: 2 },
  { title: "Third Video", rating: 3, comments: 1, createAt: "1 minutes ago", views: 2, id: 3 },
];
export const trending = (req, res) => {
  return res.render("home", { pageTitle: "Home", videos: videos }); //home.pug를 유저에게 보여준다
  //return res.render("home", { pageTitle: "Home", videos }); 이렇게 줄일 수 있다
};
export const watch = (req, res) => {
  //console.log(req.params); //url에 id변수가 있으니 params를 찍어볼 수 있다
  const { id } = req.params; //ES6 최신문법(아래와같음)
  //  const id = req.params.id;
  const videoInfo = videos[id - 1]; //비디오 id로 정보를 가져온다
  return res.render("watch", { pageTitle: `Watching ${videoInfo.title}`, videoInfo });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  const videoInfo = videos[id - 1]; //비디오 id로 정보를 가져온다
  return res.render("edit", { pageTitle: `Editing ${videoInfo.title}`, videoInfo });
};
export const postEdit = (req, res) => {
  console.log(req.body); //form body
  const { id } = req.params;
  const { title } = req.body;
  videos[id - 1].title = title; // DB title update
  return res.redirect(`/video/${id}`);
};
export const deleteVideo = (req, res) => res.send("video delete", { pageTitle: "Video Delete" });
export const upload = (req, res) => res.send("video upload", { pageTitle: "Video Upload" });
