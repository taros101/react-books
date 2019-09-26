export interface BookTypes {
    title: string;
    author: string;
    description: string;
    cover: string;
    price: number;
    _id: number;
}

export interface SortBookTypes {
    title: string;
    booksCount: number;
    price: number;
}