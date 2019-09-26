import { put, takeEvery, call } from "redux-saga/effects";
import req  from '../../services/req'

const url = "http://localhost:3000/users/deleteUser/";
const localStore = JSON.parse(localStorage.getItem('userAuth') || '{}')

export function* adminsEdit(): IterableIterator<any> {
  yield takeEvery(`ADMINS_EDIT`, function*(action: any) {
    try {
      if (action.payload.usersEdit) {
        const {
          usersEdit: {id, email, img, userBooks}
        } = action.payload;

         yield call(req, 'users/editUser', 'PUT', id, localStore.token, {
          "email": email,
          "img": img,
          "userBooks": userBooks,
        });

        const usersRes = yield call(req, 'users', 'GET', '', '');
        const usersBaseNew = usersRes.data

        yield put({
          type: `USER_EDIT`, 
          payload: {
            usersBaseNew
          }
        })
      } else if (action.payload.usersDelete) {
        const id = action.payload.usersDelete.id
        yield call(fetch, url + id, {
          method: "DELETE",
          headers: {
              'authorization': `${localStore.token}`
          }
        });
        
        const usersRes = yield call(req, 'users', 'GET', '', '');
        const usersBaseNew = usersRes.data

        yield put({
          type: `USER_DELETE`, 
          payload: {
            usersBaseNew
          }
        })
      }
    } catch (error) {
      yield put({
        type: `ADMIN_ERROR`, 
        payload: {
          errors: error.message
        }
      })
    }
  });
}
