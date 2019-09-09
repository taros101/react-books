import { put, takeEvery, call } from "redux-saga/effects";
import req  from '../../services/req'

export function* admin(): IterableIterator<any> {
  yield takeEvery(`ADMIN`, function*(action: any) {
    try {
      const usersReq = yield call(req, 'users', 'GET', '', '');
      const usersBase = usersReq.data

      yield put({
        type: `USERS_BASE`,
        payload: {
          usersBase
        } 
      })
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
