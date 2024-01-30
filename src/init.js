import "dotenv/config"; //env 파일 사용
import "./db"; //db.js 파일 import: DB연결 (mongoose)
import "./models/video"; //DB 스키마 정의 (mongoose)
import "./models/user"; //DB 스키마 정의 (mongoose)
import app from "./server";

const PORT = 4000;
const handleListening = () => console.log(`✅ Server listening on http://localhost:${PORT} 🚀`);

//express listening start
app.listen(PORT, handleListening);
