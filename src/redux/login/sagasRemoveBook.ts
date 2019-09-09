import { put, takeEvery, call } from "redux-saga/effects";
import { BookTypes } from '../../types/bookTypes'
import req  from '../../services/req'
import sortBooks  from '../../services/sortBooks'

export function* removeBookFromCart(): IterableIterator<any> {
  yield takeEvery(`USER_REMOVE_BOOK`, function*(action: any) {
    try {
      const data = action.payload

      const removeBook = data.book
      const userBooks = data.userBooks

      const removeBookId = userBooks.findIndex((item: BookTypes) => item.title === removeBook.title);
      userBooks.splice(removeBookId, 1)

      const sortBooksArr = sortBooks(userBooks)

      yield call(req, 'users', 'PUT', data.id, '', {
        "email": data.email,
        "img": data.img,
        "userBooks": userBooks
      });

      yield put({
        type: `REMOVE_BOOK_FROM_CART`,
        payload: {
          userBooks,
          sortUserBooks: sortBooksArr.sortUserBooks,
          totalPrice: sortBooksArr.totalPrice
        } 
      }) 
    } catch (error) {
      yield put({
        type: `LOGIN_ERROR`,
        payload: {
          errors: error.message
        } 
      });
    }
  });
}
