import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = () => {
  const db_connect = process.env.DB_CONNECT;

  if (!db_connect) {
    console.error('No se ha especificado la cadena de conexión a la base de datos');
    process.exit(1);
  }

  mongoose
    .connect(db_connect)
    .then(() => {
      console.log('Base de datos conectada exitosamente');
    })
    .catch((error) => {
      console.error('Error al conectar con la base de datos:', error);
      process.exit(1); 
    });
};

export default connectDB;
