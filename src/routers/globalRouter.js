import express from "express";
import { home, search } from "../controllers/videoController";
import { join } from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/join", join);
globalRouter.get("/search", search);

export default globalRouter;
