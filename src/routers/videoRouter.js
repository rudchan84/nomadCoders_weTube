import express from "express";
import { see, edit, upload, deleteVideo } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/upload", upload); //upload가 변수가 되지 않게 :id보다 위에 위치
videoRouter.get("/:id(\\d+)", see); //\d+가 숫자만 선택하게 하는 정규식인데, 정규식 사용을 하려면 \\d+라고 적용
videoRouter.get("/:id(\\d+)/edit", edit); //숫자만 선택하게 적용하면 /upload가 밑으로 가도 정상적으로 작동함
videoRouter.get("/:id(\\d+)/delete", deleteVideo);

export default videoRouter;
