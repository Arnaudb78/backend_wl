import { saveLoc } from "../controllers/weatherController";
import { Router } from "express";

const router = Router();

router.post("/coords", saveLoc);
router.get("/coords", saveLoc);

export default router;
