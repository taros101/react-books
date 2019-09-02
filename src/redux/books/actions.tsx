import { BookTypes } from '../../types/bookTypes'

export const booksStore = (payload: BookTypes) => ({ type: "BOOKS_STORE", payload });
export const snackbarClose = () => ({ type: "SNACKBAR_CLOSE" });