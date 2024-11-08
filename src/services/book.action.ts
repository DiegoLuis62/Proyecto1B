import Book, { IBook } from '../models/book.model';

// Acción para crear un libro
export const createBookAction = async (bookData: Partial<IBook>): Promise<IBook> => {
    const book = new Book(bookData);
    await book.save();
    return book;
};

// Acción para actualizar un libro
export const updateBookAction = async (bookId: string, updates: Partial<IBook>): Promise<IBook | null> => {
    return await Book.findByIdAndUpdate(bookId, updates, { new: true });
};

// Acción para desactivar un libro
export const deleteBookAction = async (bookId: string): Promise<IBook | null> => {
    return await Book.findByIdAndUpdate(bookId, { isActive: false }, { new: true });
};

// Acción para obtener un libro específico
export const getBookAction = async (bookId: string): Promise<IBook | null> => {
    return await Book.findOne({ _id: bookId, isActive: true });
};

// Acción para obtener libros con filtros
export const getBooksAction = async (filters: Record<string, any>): Promise<IBook[]> => {
    return await Book.find(filters);
};

// Acción para reservar un libro
export const reserveBookAction = async (bookId: string, userId: string): Promise<IBook | null> => {
    const book = await Book.findById(bookId);
    if (!book || !book.isActive || !book.isAvailable) return null;

    book.reservedBy.push({
        userId,
        reservedDate: new Date(),
        returnDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    });
    book.isAvailable = false;
    await book.save();
    return book;
};
