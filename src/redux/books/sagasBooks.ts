import { put, takeEvery, call } from "redux-saga/effects";
import req  from '../../services/req'

const localStore = JSON.parse(localStorage.getItem('userAuth') || '{}')

export function* booksStore(): IterableIterator<any> {
  yield takeEvery(`BOOKS_STORE`, function*(action: any) {
    try {
      if (action.payload === undefined) {
        const booksReq = yield call(req, 'books', 'GET', '', '')

  
        yield put({
          type: `BOOKS_STORE_SUCCESS`,
          payload: {
              books: booksReq
          } 
        })
      } else if (
          action.payload.bookTitle 
          && action.payload.bookAuthor 
          && action.payload.bookDescription
          && action.payload.bookPrice
          && action.payload.bookCover
          ) {
          const bookTitle = action.payload.bookTitle
          const bookAuthor = action.payload.bookAuthor
          const bookDescription = action.payload.bookDescription
          const bookPrice = action.payload.bookPrice
          const bookCover = action.payload.bookCover
          const history = action.payload.history

          yield call(req, 'books/addBook', 'POST', '', localStore.token, {
            "title": bookTitle, 
            "author": bookAuthor, 
            "description": bookDescription, 
            "price": bookPrice,
            "cover": bookCover
          })

        yield put({
          type: `CREATE_BOOK`,
          payload: {
            bookTitle,
            bookAuthor,
            bookDescription,
            bookPrice,
            bookCover
          } 
        });

        return history.push('/');
      } else if (action.payload.searchBook || action.payload.searchBook === '') {
        const searchedTitle = action.payload.searchBook
        const books = yield call(req, 'books', 'GET', searchedTitle, '')

        yield put({
          type: `BOOKS_STORE_SUCCESS`,
          payload: {
              books
          } 
        })
      } else {
        yield put({
          type: `BOOKS_ERROR`, 
          payload: {
            errors: "Вы не ввели все данные"
          }
        })
      }
    } catch (error) {
      yield put({
        type: `BOOKS_ERROR`, 
        payload: {
          errors: error.message
        }
      })
    }
  });
}
