import { weatherHistory, saveLoc } from "../controllers/weatherController";
import { Router } from "express";

const router = Router();

router.get("/", weatherHistory);
router.post("/coords", saveLoc);

export default router;
