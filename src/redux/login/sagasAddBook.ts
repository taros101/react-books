import { put, takeEvery, call } from "redux-saga/effects";
import req  from '../../services/req'
import sortBooks  from '../../services/sortBooks'

export function* addBookToCart(): IterableIterator<any> {
  yield takeEvery(`USER_ADD_BOOK`, function*(action: any) {
    try {
      const data = action.payload
      
      const addBook = data.book
      const userBooks = data.userBooks
      userBooks.books.push(addBook)

      const sortBooksArr = sortBooks(userBooks)

      yield call(req, 'users', 'PUT', data.id, '', {
        "email": data.email,
        "img": data.img,
        "userBooks": userBooks
      });

      yield put({
        type: `ADD_BOOK_TO_CART`,
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
