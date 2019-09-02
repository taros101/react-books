import { put, takeEvery, call } from "redux-saga/effects";
import { UserTypes } from '../../types/userTypes'

// worker sagas
export function* doRegistration(): IterableIterator<any> {
  yield takeEvery(`DO_REGISTRATION`, function*(action: any) {

    const url = "http://localhost:3000/users";
   
    try {
      const {
        data: { email, password, secondPassword, history, img}
      } = action;

      const result = yield call(() => {
        return fetch(url)
                .then(res => res.json())
        }
      );

      const usersCheck = result.find((item: UserTypes) => item.email === email);

      if (email === '' || password === '' || secondPassword === '') {
        yield put({
          type: `REGISTRATION_ERRORS`,
          payload: {
            errors: "Вы не ввели email или пароль"
          } 
        })
      } else if (password !== secondPassword) {
        yield put({
          type: `REGISTRATION_ERRORS`,
          payload: {
            isLoading: false,
            errors: 'Пароли не совпадают'
          } 
        });
      } else if (usersCheck) {
        yield put({
          type: `REGISTRATION_ERRORS`,
          payload: {
            isLoading: false,
            errors: 'Такой пользователь уже создан'
          } 
        });
      } else {
        yield call(fetch, url,{
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "email": email, 
            "password": password, 
            "userType": "user", 
            "img": img,
            "userBooks": []
          })
        });

        yield put({
          type: `REGISTRATION_SUCCESS`,
          payload: {
            email,
            password,
            userType: 'user',
            img,
            isLoading: false,
            errors: false
          } 
        });

        return history.push('/login');
      }
    } catch (error) {
      yield put({
        type: `REGISTRATION_ERRORS`,
        payload: {
          isLoading: false,
          errors: error.message
        } 
      });
    }
  });
}