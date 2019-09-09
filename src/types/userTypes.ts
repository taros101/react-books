import { BookTypes } from './bookTypes'

export interface UserTypes {
    email: string;
    roles: string;
    img: string;
    userBooks: BookTypes[];
    _id: number;
}