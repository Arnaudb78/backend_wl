import { Request, Response } from "express";
import dotenv from "dotenv";
import setupDBConnection from "./config/connection";
import express from "express";
import cors from "cors";
import usersRouter from "./routes/usersRouter";
import weatherRouter from "./routes/weatherRouter";

dotenv.config();
setupDBConnection();

const app = express();
app.use(
    cors({
        origin: "http://localhost:4200",
    })
);
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Backend online");
});

app.use("/user", usersRouter);
app.use("/api", weatherRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server online !");
});

export default app;
