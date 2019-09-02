import { put, takeEvery, call } from "redux-saga/effects";

const url = "http://localhost:3000/books";

// worker sagas
export function* booksStore(): IterableIterator<any> {
  yield takeEvery(`BOOKS_STORE`, function*(action: any) {
    try {
      const books = yield call(() => {
        return fetch(url)
                .then(res => res.json())
        }
      );

      if (action.payload === undefined) {
        yield put({
          type: `BOOKS_STORE_SUCCESS`,
          payload: {
              books
          } 
        })
      } else if (action.payload.bookTitle 
        && action.payload.bookAuthor 
        && action.payload.bookDescription
        && action.payload.bookPrice
        && action.payload.bookCover) {
        const bookTitle = action.payload.bookTitle
        const bookAuthor = action.payload.bookAuthor
        const bookDescription = action.payload.bookDescription
        const bookPrice = action.payload.bookPrice
        const bookCover = action.payload.bookCover
        const history = action.payload.history
        
        yield call(fetch, url,{
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "title": bookTitle, 
            "author": bookAuthor, 
            "description": bookDescription, 
            "price": bookPrice,
            "cover": bookCover
          })
        });

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
