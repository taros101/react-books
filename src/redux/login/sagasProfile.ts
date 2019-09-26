import { put, takeEvery, call } from "redux-saga/effects";
import req  from '../../services/req'

export function* profileChanges(): IterableIterator<any> {
  yield takeEvery(`PROFILE_CHANGES`, function*(action: any) {
    try {
      const data = action.payload

      yield call(req, 'users/changeProfile', 'PUT', data.id, '', {
        "email": data.email,
        "img": data.imgChange,
        "userBooks": data.userBooks
      });

      yield put({
          type: `USER_CHANGE_AVATAR`,
          payload: {
            img: data.imgChange
          } 
      })
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
