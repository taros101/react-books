import { BookTypes } from './bookTypes'

export interface UserTypes {
    email: string;
    password: string;
    userType: string;
    img: string;
    userBooks: BookTypes[];
    id: number;
}