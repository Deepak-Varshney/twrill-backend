// import express from "express";
// import dotenv from "dotenv"
// dotenv.config();
// const PORT = process.env.PORT || 5000
// import authRoutes from "./src/routes/auth.routes.js"




// const app = express();

// app.use(express.json());
// app.use('/auth', authRoutes);



// app.get('/health', async (req, res) => {
//     try {
//         res.json("working");
//     } catch (err) {
//         console.error(err);
//         res.status(500).json(err);
//     }
// })

// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`)
// })


import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.routes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);

app.get("/api/health", (req, res) => {
  res.json("working");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});