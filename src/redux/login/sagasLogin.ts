import { put, takeEvery, call } from "redux-saga/effects";
import req  from '../../services/req'
import sortBooks  from '../../services/sortBooks'
import * as jwt from "jsonwebtoken";

export function* doLogin(): IterableIterator<any> {
  yield takeEvery(`DO_LOGIN`, function*(action: any) {
    try {
      const {
        data: { email, password, history }
      } = action;

      if (email === '' || password === '') {
        yield put({
          type: `LOGIN_ERROR`,
          payload: {
            errors: "Вы не ввели email или пароль"
          } 
        })
      } else if (email.search(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/) < 0) {
        yield put({
          type: `LOGIN_ERROR`,
          payload: {
            isLoading: false,
            errors: 'Невалидный email'
          } 
        });
      } else {
        const loginReq = yield call(req, 'authenticate', 'POST', '', '', {
          "email": email, 
          "password": password
        })

        const token = loginReq.data

        if (token) {
          const decoded: any = jwt.decode(token);
          const id = decoded.id
          const roles = decoded.roles

          localStorage.setItem('userAuth', JSON.stringify({
            "auth": true,
            "roles": roles,
            "token": token,
            "id": id
          }));

          const authGet = yield call(req, 'users', 'GET', id, token);

          const user = authGet.data

          const userBooks = user.userBooks
          const sortBooksArr = sortBooks(userBooks)

          yield put({
            type: `LOGIN_SUCCESS`,
            payload: {
              email: user.email,
              roles,
              img: user.img,
              userBooks: user.userBooks,
              id,
              sortUserBooks: sortBooksArr.sortUserBooks,
              totalPrice: sortBooksArr.totalPrice
            } 
          })

          return history.push('/');
        } else {
          yield put({
            type: `LOGIN_ERROR`,
            payload: {
              errors: loginReq.message
            } 
          });
        }
      }
    } 
    catch (error) {
      yield put({
        type: `LOGIN_ERROR`,
        payload: {
          errors: error.message
        } 
      });
    }
  });
}
