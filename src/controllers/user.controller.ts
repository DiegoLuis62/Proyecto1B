import { updateUserById, desactivateUserById } from '../services/user.action';

export const updateUserController = (userId: string, updates: object) => {
    return updateUserById(userId, updates)
        .then(updatedUser => updatedUser)
        .catch(err => { throw new Error('Error al actualizar el usuario: ' + err.message) });
};

export const desactivateUserController = (userId: string) => {
    return desactivateUserById(userId)
        .then(() => true)
        .catch(err => { throw new Error('Error al desactivar el usuario: ' + err.message) });
};
