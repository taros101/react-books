import { put, takeEvery, call } from "redux-saga/effects";
import uniqBy from 'lodash/uniqBy'
import { UserTypes } from '../../types/userTypes'
import { BookTypes, SortBookTypes } from '../../types/bookTypes'

const url = "http://localhost:3000/users";

// worker sagas
export function* removeBookFromCart(): IterableIterator<any> {
  yield takeEvery(`USER_REMOVE_BOOK`, function*(action: any) {
    try {
      const result = yield call(() => {
        return fetch(url)
                .then(res => res.json())
        }
      );
      
      if (action.payload.book) {
        const userEmail = action.payload.userEmail
        const userBook = action.payload.book
        const user = result.find((item: UserTypes) => item.email === userEmail);
        const userUrl = url + '/' + user.id
        const userBooks = user.userBooks
        const removeBookId = userBooks.findIndex((item: BookTypes) => item.title === userBook.title);

        userBooks.splice(removeBookId, 1)

        //Sort Books
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

        yield call(fetch, userUrl ,{
          method: "PUT",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "email": user.email, 
            "password": user.password, 
            "userType": user.userType, 
            "img": user.img,
            "userBooks": userBooks
          })
        });

        localStorage.removeItem('userAuth');
        localStorage.setItem('userAuth', JSON.stringify({
          "email": user.email,
          "password": user.password,
          "auth": true,
          "userType": user.userType,
          "img": user.img,
          "userBooks": userBooks,
          "sortUserBooks": sortUserBooks,
          "totalPrice": totalPrice
        }));

        yield put({
          type: `REMOVE_BOOK_FROM_CART`,
          payload: {
            email: user.email,
            password: user.password,
            userType: user.userType,
            img: user.img,
            userBooks: userBooks,
            sortUserBooks,
            totalPrice
          } 
        })
        
      } 

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
