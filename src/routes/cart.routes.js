import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { createCart, decreaseQty, getCart, increaseQty } from "../controllers/cart.controller.js";

const router = Router()


router.get('/getCart', protect, getCart);
router.post('/add', protect, createCart);
router.patch('/increase/:variantId', protect, increaseQty);
router.patch('/decrease/:variantId', protect, decreaseQty);

export default router;