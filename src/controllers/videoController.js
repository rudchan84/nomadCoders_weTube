export const trending = (req, res) => {
  const videos = [
    { title: "First Video", rating: 5, comments: 12, createAt: "22 minutes ago", views: 95, id: 1 },
    { title: "Second Video", rating: 4, comments: 3, createAt: "7 minutes ago", views: 23, id: 2 },
    { title: "Third Video", rating: 3, comments: 1, createAt: "1 minutes ago", views: 2, id: 3 },
  ];
  return res.render("home", { pageTitle: "Home", videos: videos }); //home.pug를 유저에게 보여준다
  //return res.render("home", { pageTitle: "Home", videos }); 이렇게 줄일 수 있다
};
export const see = (req, res) => res.render("watch", { pageTitle: "Watch" });
export const edit = (req, res) => res.render("edit", { pageTitle: "Edit" });
export const deleteVideo = (req, res) => res.send("video delete", { pageTitle: "Video Delete" });
export const upload = (req, res) => res.send("video upload", { pageTitle: "Video Upload" });
