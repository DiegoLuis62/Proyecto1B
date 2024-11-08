import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import bookRoutes from './routes/books.routes';
import connectDB from './config/db';

const app: Application = express();
const PORT = process.env.PORT || 8080;

// Configurar dotenv para acceder a variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

// Middleware de CORS y JSON
app.use(cors());
app.use(express.json());

// Definir rutas
app.use('/api/auth', authRoutes);  // Rutas de autenticación
app.use('/api/user', userRoutes);  // Rutas de gestión de usuarios
app.use('/api/books', bookRoutes);  // Rutas para libros

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Inicializar servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
