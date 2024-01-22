import User from "../models/user";

// JOIN
export const getJoin = (req, res) => res.render("join", { pateTitle: "Join" });
export const postJoin = async (req, res) => {
  const { email, username, password, name, location } = req.body;
  await User.create({
    email,
    username,
    password,
    name,
    location,
  });
  return res.redirect("/login");
};

//LOGIN
export const getLogin = (req, res) => res.send("login");
export const edit = (req, res) => res.send("edit user");
export const remove = (req, res) => res.send("remove user");
export const logout = (req, res) => res.send("logout");
export const see = (req, res) => res.send("see");
