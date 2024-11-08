import { registerUserAction, loginUserAction } from '../services/auth.action';

export const registerController = (userData: { name: string; email: string; password: string }) => {
  return registerUserAction(userData)
    .then(user => user)
    .catch(err => { throw new Error('Error al registrar el usuario: ' + err.message) });
};

export const loginController = (email: string, password: string) => {
  return loginUserAction(email, password)
    .then(({ user, token }) => ({ user, token }))
    .catch(err => { throw new Error('Error al iniciar sesión: ' + err.message) });
};
