import { saveLoc } from "../controllers/weatherController";
import { Router } from "express";

const router = Router();

router.post("/coords", saveLoc);

export default router;
