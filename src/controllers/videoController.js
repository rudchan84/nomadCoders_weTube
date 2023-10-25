const fakeUser = {
  username: "Nico",
  loggedIn: true,
};

export const trending = (req, res) => res.render("home", { pageTitle: "Home", userPotato: fakeUser }); //home.pug를 유저에게 보여준다
export const see = (req, res) => res.render("watch", { pageTitle: "Watch" });
export const edit = (req, res) => res.render("edit", { pageTitle: "Edit" });
export const deleteVideo = (req, res) => res.send("video delete", { pageTitle: "Video Delete" });
export const upload = (req, res) => res.send("video upload", { pageTitle: "Video Upload" });
