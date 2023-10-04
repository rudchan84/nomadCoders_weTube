import express from "express";

const videoRouter = express.Router();
const handleWatchVideo = (req, res) => res.send("Video Watch");
videoRouter.get("/watch", handleWatchVideo);
videoRouter.get("/edit", (req, res) => res.send("Video Edit"));
export default videoRouter;
