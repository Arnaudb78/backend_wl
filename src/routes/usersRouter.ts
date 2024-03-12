import { getUser, getUserById, createUser } from "../controllers/userController";
import { Router } from "express";

const router = Router();

router.get("/", getUser);

router.get("/:id", getUserById);

router.post("/", createUser);

export default router;
