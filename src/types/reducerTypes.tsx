import { BookTypes, SortBookTypes } from './bookTypes'
import { UserTypes } from './userTypes'

export interface RegistrationTypes {
  email: string;
  password: string;
  isLoading: boolean;
  errors: string;
  userType: string;
  img: string;
  userBooks: BookTypes[];
  snackbarOpen: boolean;
}

export interface LoginTypes {
    email: string;
    password: string;
    isLoading: boolean;
    auth: boolean;
    errors: string;
    userType: string;
    img: string;
    snackbarOpen: boolean;
    userBooks: BookTypes[];
    sortUserBooks: SortBookTypes[];
    totalPrice: number;
}

export interface BooksTypes {
    title: string;
    author: string;
    description: string;
    cover: string;
    price: string;
    books: BookTypes[];
    errors: string;
    snackbarOpen: boolean;
}

export interface AdminTypes {
    usersBase: UserTypes[],
    modal: boolean;
    errors: string;
    snackbarOpen: boolean;
    addBookModal: boolean;
}