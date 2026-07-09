import express, { Router } from "express"
import { getMe, login, logout, register } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/signup",register);
router.post("/login",login);
router.post("/logout",logout);
router.get("/me",protect,getMe);

export default router;