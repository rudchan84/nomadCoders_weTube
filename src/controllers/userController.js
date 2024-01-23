import User from "../models/user";

// JOIN
export const getJoin = (req, res) => res.render("join", { pateTitle: "Join" });
export const postJoin = async (req, res) => {
  const { email, username, password, password2, name, location } = req.body;

  const existsEmail = await User.exists({ email });
  const existsUsername = await User.exists({ username });
  //const exists = await User.exists({ $or: [{ username }, { email }] }); 이렇게 or 절 사용 가능

  if (password !== password2) {
    return res.render("join", { pateTitle: "Join", errorMessage: "비밀번호 2개가 같지 않습니다" });
  }

  if (existsEmail) {
    return res.render("join", { pateTitle: "Join", errorMessage: "사용중인 이메일 주소 입니다" });
  }
  if (existsUsername) {
    return res.render("join", { pateTitle: "Join", errorMessage: "사용중인 이름 입니다" });
  }

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
