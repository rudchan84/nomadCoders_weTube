//const express = require("express");
//babel을 이용해 최신 JS문법을 사용하자(아래로 사용)
//express package를 express라는 이름으로 import 해 온 것
//nodeJS와 npm이 알아서 node_modules에서 express의 index.js를 찾아서 가지고 옴
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

//다음 express 어플리케이션 생성
const PORT = 4000;
const app = express();
const logger = morgan("dev");
const handleListening = () => console.log(`✅ Server listening on http://localhost:${PORT} 🚀`);

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
app.use("/", globalRouter);
app.use("/video", videoRouter);
app.use("/user", userRouter);

//route
app.get("/", handleHome);

//express listening start
app.listen(PORT, handleListening);
