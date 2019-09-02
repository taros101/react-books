import { put, takeEvery, call } from "redux-saga/effects";
import { UserTypes } from '../../types/userTypes'

const url = "http://localhost:3000/users";

// worker sagas
export function* profileChanges(): IterableIterator<any> {
  yield takeEvery(`PROFILE_CHANGES`, function*(action: any) {
    try {
      const result = yield call(() => {
        return fetch(url)
                .then(res => res.json())
        }
      );
      
      if (action.payload.imgChange) {
        const userEmail = action.payload.userEmail
        const newImg = action.payload.imgChange
        const sortUserBooks = action.payload.sortUserBooks
        const totalPrice = action.payload.totalPrice
        const user = result.find((item: UserTypes) => item.email === userEmail);
        const userUrl = url + '/' + user.id
        
        yield call(fetch, userUrl ,{
          method: "PUT",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "email": user.email, 
            "password": user.password, 
            "userType": user.userType,
            "userBooks": user.userBooks,
            "img": newImg
          })
        });

        localStorage.removeItem('userAuth');
        localStorage.setItem('userAuth', JSON.stringify({
          "email": user.email,
          "password": user.password,
          "auth": true,
          "userType": user.userType,
          "userBooks": user.userBooks,
          "img": newImg,
          "sortUserBooks": sortUserBooks,
          "totalPrice": totalPrice
        }));

        yield put({
          type: `USER_CHANGE_AVATAR`,
          payload: {
            email: user.email,
            password: user.password,
            userType: user.userType,
            userBooks: user.userBooks,
            img: newImg,
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
