import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB Error", error);
//on: 여러번 발생하는 이벤트
db.on("error", handleError);
//once: 한번만 발생하는 이벤트
db.once("open", handleOpen);
