import { put, takeEvery, call } from "redux-saga/effects";

export function* doRegistration(): IterableIterator<any> {
  yield takeEvery(`DO_REGISTRATION`, function*(action: any) {

    const url = "http://localhost:3000/v1/register";
   
    try {
      const {
        data: { email, password, secondPassword, history, img}
      } = action;

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
      } else if (email.search(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/) < 0) {
        yield put({
          type: `REGISTRATION_ERRORS`,
          payload: {
            isLoading: false,
            errors: 'Невалидный email'
          } 
        });
      } else {
        const register = yield call(() => {
          return fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "email": email, 
              "password": password,
              "img": img,
              "userBooks": []
            })
          }).then(res => res.json())
          }
        );

        if (register.success) {
          yield put({
            type: `REGISTRATION_SUCCESS`,
            payload: {
              email,
              img,
              password
            } 
          });
  
          return history.push('/login');
        } else {
          yield put({
            type: `REGISTRATION_ERRORS`,
            payload: {
              isLoading: false,
              errors: register.message
            } 
          });
        }
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