import User from "../models/user";
import bcrypt from "bcrypt";

// JOIN
export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const { email, username, password, password2, name, location } = req.body;

  const existsEmail = await User.exists({ email });
  const existsUsername = await User.exists({ username });
  //const exists = await User.exists({ $or: [{ username }, { email }] }); 이렇게 or 절 사용 가능

  if (password !== password2) {
    return res.status(400).render("join", { pageTitle: "Join", errorMessage: "비밀번호 2개가 같지 않습니다" });
  }

  if (existsEmail) {
    return res.status(400).render("join", { pageTitle: "Join", errorMessage: "사용중인 이메일 주소 입니다" });
  }
  if (existsUsername) {
    return res.status(400).render("join", { pageTitle: "Join", errorMessage: "사용중인 이름 입니다" });
  }

  try {
    await User.create({
      email,
      username,
      password,
      name,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: error.errors.description,
    });
  }
};

//LOGIN
export const getLogin = (req, res) => res.render("login", { pageTitle: "Log in" });
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const userInfo = await User.findOne({ username });
  if (!userInfo) {
    return res.status(400).render("login", { pageTitle: "Log In", errorMessage: "없는 ID 입니다" });
  }
  const loginSuccess = await bcrypt.compare(password, userInfo.password);
  if (!loginSuccess) {
    return res.status(400).render("login", { pageTitle: "Log In", errorMessage: "비밀번호가 틀립니다" });
  }
  res.redirect("/");
};

export const edit = (req, res) => res.send("edit user");
export const remove = (req, res) => res.send("remove user");
export const logout = (req, res) => res.send("logout");
export const see = (req, res) => res.send("see");
