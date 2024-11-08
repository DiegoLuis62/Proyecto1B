import { Router, Request, Response } from 'express';
import { registerController, loginController } from '../controllers/auth.controller';

const router = Router();

const Register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;
  try {
    const user = await registerController({ name, email, password });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

const Login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const { user, token } = await loginController(email, password);
    res.status(200).json({ message: 'Login successful', user, token });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

router.post('/register', Register);
router.post('/login', Login);

export default router;
