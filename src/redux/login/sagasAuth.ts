import { put, takeEvery, call } from "redux-saga/effects";
import req  from '../../services/req'
import sortBooks  from '../../services/sortBooks'

export function* doAuth(): IterableIterator<any> {
  yield takeEvery(`DO_AUTH`, function*(action: any) {
    try {
      const localStore = JSON.parse(localStorage.getItem('userAuth') || '{}')
      const user = yield call(req, 'users', 'GET', localStore.id, localStore.token);

      const userBooks = user.data.userBooks
      const sortBooksArr = sortBooks(userBooks)
      const sortUserBooks =  sortBooksArr.sortUserBooks
      const totalPrice = sortBooksArr.totalPrice

      yield put({
        type: `DO_AUTH_SUCCESS`,
        data: {
          auth: localStore.auth,
          email: user.data.email,
          roles: localStore.roles,
          id: localStore.id,
          img: user.data.img,
          userBooks: userBooks,
          sortUserBooks,
          totalPrice
          } 
      }) 
    } catch (error) {
      yield put({
        type: `DO_AUTH_FAILED`,
        payload: {
          errors: error.message
        } 
      });
    }
  });
}
