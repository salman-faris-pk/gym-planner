import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import { profileRouter } from "./routes/profile";
import { planRouter } from "./routes/plan";


dotenv.config();

const app= express();
const PORT= process.env.PORT || 3009;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
    
app.use("/api/profile", profileRouter)
app.use("/api/plan", planRouter)

app.listen(PORT,()=> {
    console.log(`server running on port: ${PORT}`);
})