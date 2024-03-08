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
  req.session.loggedIn = true;
  req.session.user = userInfo;
  res.redirect("/");
};

//gitHub Login
export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  //fetch.then을 사용하면 then > then then then fetch then 뭐 이런 식으로 계속 안으로 들어가게 되어 코드가 복잡해진다
  //아래 처럼 깔끔하게 사용하자
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code, //gitHub 가 준 최초 코드
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  //access token을 받아오자
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json", //json으로 받으려면 입력해야 함
      },
    })
  ).json();

  //token을 던져주고 유저정보를 받아오자
  if ("access_token" in tokenRequest) {
    const baseUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${baseUrl}/user`, {
        headers: {
          Authorization: `bearer ${tokenRequest.access_token}`,
        },
      })
    ).json();
    //email data를 숨긴 유저는 아래에서 따로 받아 와야함
    const emailData = await (
      await fetch(`${baseUrl}/user/emails`, {
        headers: {
          Authorization: `bearer ${tokenRequest.access_token}`,
        },
      })
    ).json();
    //primary true, verified true 인 이메일만 가져오기
    const emailObj = emailData.find((email) => email.primary === true && email.verified === true);
    if (!emailObj) {
      res.redirect("/login");
    }
    console.log(userData);
    //email이 존재하면 로그인 시켜주기
    const existingUser = await User.findOne({ email: emailObj.email });
    if (existingUser) {
      req.session.loggedIn = true;
      req.session.user = existingUser;
      return res.redirect("/");
    } else {
      //없는 user면 계정 생성
      const user = await User.create({
        name: userData.name ? userData.name : "Unkwon",
        username: userData.login,
        email: emailObj.email,
        password: "",
        socialOnly: true,
        location: userData.location,
      });
      req.session.loggedIn = true;
      req.session.user = user;
      return res.redirect("/");
    }
    console.log(emailObj);
    res.send(emailObj);
  } else {
    console.log(tokenRequest);
    res.redirect("/login");
  }
};

export const edit = (req, res) => res.send("edit user");
export const remove = (req, res) => res.send("remove user");
export const logout = (req, res) => res.send("logout");
export const see = (req, res) => res.send("see");
