import { put, takeEvery, call } from "redux-saga/effects";
import uniqBy from 'lodash/uniqBy'
import { UserTypes } from '../../types/userTypes'
import { BookTypes, SortBookTypes } from '../../types/bookTypes'

const url = "http://localhost:3000/users";

// worker sagas
export function* doLogin(): IterableIterator<any> {
  yield takeEvery(`DO_LOGIN`, function*(action: any) {
    try {
      const {
        data: { email, password, history }
      } = action;

      const result = yield call(() => {
        return fetch(url)
                .then(res => res.json())
        }
      );

      const auth = result.find((item: UserTypes) => item.email === email && item.password === password);

      if (auth) {
        const { userType, img, userBooks } = auth;

        // Sort Books
        const arr = userBooks.sort(function(a: BookTypes, b: BookTypes){
          return a.title > b.title ? 1 : -1
        })

        const arr2 = uniqBy(arr, (o: BookTypes) => o.title)

        let sortUserBooks: SortBookTypes[] = []

        let totalPrice: number = 0;

        for (let i = 0; i < arr2.length; i++) {
          const title = arr2[i].title
          const price = arr2[i].price
          const booksCount = arr.reduce((count: number, book: BookTypes) => count + (book.title === arr2[i].title ? 1 : 0), 0)
          const num = price.split(' ')
          totalPrice += Number(num[0]) * booksCount
          sortUserBooks.push({title, booksCount, price})
        }

        yield put({
          type: `LOGIN_SUCCESS`,
          payload: {
            email,
            password,
            userType,
            img,
            userBooks,
            sortUserBooks,
            totalPrice
          } 
        })

        localStorage.removeItem('userAuth');
        localStorage.setItem('userAuth', JSON.stringify({
          "email": email,
          "password": password,
          "auth": true,
          "userType": userType,
          "img": img,
          "userBooks": userBooks,
          "sortUserBooks": sortUserBooks,
          "totalPrice": totalPrice
        }));

        return history.push('/');
      } else if (email === '' || password === '') {
        yield put({
          type: `LOGIN_ERROR`,
          payload: {
            errors: "Вы не ввели email или пароль"
          } 
        })
      } else {
        yield put({
          type: `LOGIN_ERROR`,
          payload: {
            errors: "Не правильный email или пароль"
          } 
        })
      }
    } catch (error) {
      console.log(error.message)
      yield put({
        type: `LOGIN_ERROR`,
        payload: {
          errors: error.message
        } 
      });
    }
  });
}
