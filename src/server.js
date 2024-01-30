//const express = require("express");
//babel을 이용해 최신 JS문법을 사용하자(아래로 사용)
//express package를 express라는 이름으로 import 해 온 것
//nodeJS와 npm이 알아서 node_modules에서 express의 index.js를 찾아서 가지고 옴
import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";

//다음 express 어플리케이션 생성
const app = express();
const logger = morgan("dev");

function handleHome(req, res, next) {
  return res.send("I love middlewares");
}

//view engine으로 pug를 설정
app.set("view engine", "pug");
//default views 폴더 변경
app.set("views", "src/views");

//모든 route에서 사용할 middleware(순서가 위에 있어야함, get이 먼저 실행되면 return으로 종료 되므로)
//app.use(loggerMiddleware);
//middleware logger로 morgan을 사용해 보자
app.use(logger);
//form을 이해하고 javascript object로 변환해 주는 urlencoded 미들웨어 추가(Router 위에 쓰자)
//option 중 하나인 extended는 form body에 있는 정보를 보기좋게 해준다
app.use(express.urlencoded({ extended: true }));

//Router 앞에 session을 넣어 줘야 한다
app.use(
  session({ secret: process.env.COOKIE_SECRET, resave: false, saveUninitialized: false, store: MongoStore.create({ mongoUrl: process.env.DB_URL }) })
  //아래로도 사용할 수 있다 mongoose와 mongodb가 연결되어 있기 때문에
  //app.use(session({ secret: "Hello!", resave: true, saveUninitialized: true, store: MongoStore.create({ client: connection.client }) }));
);

app.use((req, res, next) => {
  //이 미들웨어를 Router 위에 위치 시킨다면
  //PUG는 res.locals로 접근이 가능하며 단순히 potato 변수로 호출 가능하다!
  //middlewares.js 파일로 옮기자
  /*res.locals.potato = "eat";
  //아래를 통해 백엔드에 접속했던 모든 세션을 볼 수 있다
  req.sessionStore.all((error, sessions) => {
    console.log(sessions);
    next();
  });*/
  next();
});

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/video", videoRouter);
app.use("/user", userRouter);

//route
app.get("/", handleHome);

export default app;
