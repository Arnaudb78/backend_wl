import { getUser, getUserByEmail, createUser } from "../controllers/userController";
import { Router } from "express";

const router = Router();

router.get("/", getUser);

router.get("/email", getUserByEmail);

router.post("/", createUser);

export default router;
