import { Request, Response, Router } from "express";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { IUser } from "./user.model";
import { v4 as uuidv4 } from 'uuid';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userRouter = Router();
const userService = new UserService(new UserRepository());

// Ruta para registrar un usuario
userRouter.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 8);

  const newUser = await userService.createUser({
    userName: username,
    userId: uuidv4(),
    password: hashedPassword,
    createdAt: new Date()
  } as any);

  res.status(200).json({ message: 'User registered successfully', user: newUser });
});

// Ruta para hacer login
userRouter.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Busca el usuario en la "base de datos"
  const user = await userService.getUserByUserName(username);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return
  }

  // Verifica la contraseña
  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    res.status(401).json({ message: 'Invalid password' });
    return
  }

  // Genera un token JWT
  const token = jwt.sign({ id: user.userId }, 'secret-key', { expiresIn: '1h' }); // Expira en 1 hora

  res.status(200).json({ auth: true, token });
});

// Ruta para obtener un usuario por ID
userRouter.get("/:id", async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.params.id);
  user ? res.json(user) : res.status(404).json({ message: "User not found" });
});

// Ruta para obtener todos los usuarios
userRouter.get("/", async (req: Request, res: Response) => {
  const users = await userService.getAllUser();
  res.json(users);
});

// Ruta para actualizar un usuario
userRouter.put("/", async (req: Request, res: Response) => {
  const reqBody: IUser = req.body;
  const response = await userService.updateUser(reqBody);
  response !== null ? res.json({ message: "User updated" }) : res.status(404).json({ message: "User not found" });
});

export default userRouter;