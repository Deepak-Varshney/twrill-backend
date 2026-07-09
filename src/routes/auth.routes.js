import express, { Router } from "express"
import { login, logout, register } from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup",register);
router.post("/login",login);
router.post("/logout",logout);

export default router;