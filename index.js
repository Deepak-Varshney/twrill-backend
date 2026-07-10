import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.routes.js";
import productRoutes from "./src/routes/product.routes.js";
import cartRoutes from "./src/routes/cart.routes.js";
import cookieParser from "cookie-parser";
import { createCart } from "./src/controllers/cart.controller.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cookieParser());

app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/", productRoutes);
app.use("/api/cart", cartRoutes);

app.get("/api/health", (req, res) => {
  res.json("working");
});



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});