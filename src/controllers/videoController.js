export const trending = (req, res) => res.render("home"); //home.pug를 유저에게 보여준다
export const see = (req, res) => res.render("watch");
export const edit = (req, res) => res.render("edit");
export const deleteVideo = (req, res) => res.send("video delete");
export const upload = (req, res) => res.send("video upload");
