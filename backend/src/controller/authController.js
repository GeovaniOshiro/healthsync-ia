import bcrypt from "bcrypt";
import users from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

// REGISTER
export async function register(req, res) {
  const { name, email, password } = req.body;

  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ message: "Usuário já existe" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now(),
    name,
    email,
    password: hashedPassword
  };

  users.push(newUser);

  res.status(201).json({ message: "Usuário criado com sucesso" });
}

// LOGIN
export async function login(req, res) {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(400).json({ message: "Usuário não encontrado" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Senha inválida" });
  }

  const token = generateToken(user);

  res.json({
    message: "Login realizado com sucesso",
    token
  });
}