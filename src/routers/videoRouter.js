import express from "express";
import { watch, getEdit, getUpload, postUpload, deleteVideo, postEdit } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch); //\d+가 숫자만 선택하게 하는 정규식인데, 정규식 사용을 하려면 \\d+라고 적용
//videoRouter.get("/:id(\\d+)/edit", getEdit); //숫자만 선택하게 적용하면 /upload가 밑으로 가도 정상적으로 작동함
//videoRouter.post("/:id(\\d+)/edit", postEdit);
//위2개를 아래로 간단화 할 수 있다
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);
videoRouter.route("/upload").get(getUpload).post(postUpload); //upload가 변수가 되지 않게 :id보다 위에 위치

export default videoRouter;
