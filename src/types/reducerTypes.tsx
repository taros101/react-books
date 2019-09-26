import { BookTypes, SortBookTypes } from './bookTypes'
import { UserTypes } from './userTypes'

export interface RegistrationTypes {
  email: string;
  isLoading: boolean;
  errors: string;
  img: string;
  userBooks: {};
  snackbarOpen: boolean;
  password: string;
}

export interface LoginTypes {
    email: string;
    isLoading: boolean;
    auth: boolean;
    errors: string;
    roles: string;
    img: string;
    id: '';
    snackbarOpen: boolean;
    userBooks: {};
    sortUserBooks: SortBookTypes[];
    totalPrice: number;
    isBasketLoading: boolean;
    isChangeAvatarLoading: boolean;
    isAuthLoading: boolean;
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
    isBooksLoading: boolean;
}

export interface AdminTypes {
    usersBase: UserTypes[],
    modal: boolean;
    errors: string;
    snackbarOpen: boolean;
    addBookModal: boolean;
    isAdminEditing: boolean;
    modalDelete: boolean;
}