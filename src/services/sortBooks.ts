import uniqBy from 'lodash/uniqBy'
import { BookTypes, SortBookTypes } from '../types/bookTypes'

export default function sortBooks(userBooks: any) {
    const userBooksArr = userBooks.books
    const arr = userBooksArr.sort(function(a: BookTypes, b: BookTypes){
        return a.title > b.title ? 1 : -1
      })

    const arr2 = uniqBy(arr, (o: BookTypes) => o.title)

    let sortUserBooks: SortBookTypes[] = []

    let totalPrice: number = 0;

    for (let i = 0; i < arr2.length; i++) {
    const title = arr2[i].title
    const price = arr2[i].price
    const booksCount = arr.reduce((count: number, book: BookTypes) => count + (book.title === arr2[i].title ? 1 : 0), 0)
    totalPrice += price * booksCount
    sortUserBooks.push({title, booksCount, price})
    }

    return {sortUserBooks, totalPrice} 

}