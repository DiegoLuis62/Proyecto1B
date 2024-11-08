import {
    createBookAction,
    updateBookAction,
    deleteBookAction,
    getBookAction,
    getBooksAction,
    reserveBookAction
} from '../services/book.action';

export const createBookController = (bookData: object) => {
    return createBookAction(bookData)
        .then(book => book)
        .catch(err => { throw new Error('Error al crear el libro: ' + err.message) });
};

export const updateBookController = (bookId: string, updates: object) => {
    return updateBookAction(bookId, updates)
        .then(updatedBook => updatedBook)
        .catch(err => { throw new Error('Error al actualizar el libro: ' + err.message) });
};

export const deleteBookController = (bookId: string) => {
    return deleteBookAction(bookId)
        .then(() => true)  
        .catch(err => { throw new Error('Error al eliminar el libro: ' + err.message) });
};

export const getBookController = (bookId: string) => {
    return getBookAction(bookId)
        .then(book => book)
        .catch(err => { throw new Error('Error al obtener el libro: ' + err.message) });
};

export const getBooksController = (filters: any) => {
    return getBooksAction(filters)
        .then(books => books)
        .catch(err => { throw new Error('Error al obtener los libros: ' + err.message) });
};

export const reserveBookController = (bookId: string, userId: string) => {
    return reserveBookAction(bookId, userId)
        .then(reservation => reservation)
        .catch(err => { throw new Error('Error al reservar el libro: ' + err.message) });
};
