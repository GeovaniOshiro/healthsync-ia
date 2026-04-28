import express from "express";
import cors from "cors";
import env from "./config/env.js";
import authRoutes from "./routes/authRoutes.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";

const app = express();

app.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "Acesso permitido", user: req.user });
});

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

app.listen(env.port, () => {
  console.log(`Servidor rodando na porta ${env.port}`);
});