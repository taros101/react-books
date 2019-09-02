import { put, takeEvery, call } from "redux-saga/effects";

const url = "http://localhost:3000/users";

// worker sagas
export function* admin(): IterableIterator<any> {
  yield takeEvery(`ADMIN`, function*(action: any) {
    try {
      const usersBase = yield call(() => {
        return fetch(url)
                .then(res => res.json())
        }
      );

      if (action.payload === undefined) {
        yield put({
          type: `USERS_BASE`,
          payload: {
            usersBase
          } 
        })
      } else if (action.payload.usersEdit) {
        for (let i = 0; i < usersBase.length; i++) {
          if (action.payload.usersEdit.id === usersBase[i].id) {
            const userUrl = "http://localhost:3000/users/" + action.payload.usersEdit.id

            yield call(fetch, userUrl,{
              method: "PUT",
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "email": action.payload.usersEdit.email, 
                "password": action.payload.usersEdit.password, 
                "userType": "user", 
                "img": action.payload.usersEdit.img,
                "userBooks": action.payload.usersEdit.userBooks,
              })
            });
          }
        }

        const usersBaseNew = yield call(() => {
          return fetch(url)
                  .then(res => res.json())
          }
        );
        
        yield put({
          type: `USER_EDIT`, 
          payload: {
            usersBaseNew
          }
        })
      } else if (action.payload.usersDelete) {
        for (let i = 0; i < usersBase.length; i++) {
          if (action.payload.usersDelete.email === usersBase[i].email) {
            const userUrl = "http://localhost:3000/users/" + action.payload.usersDelete.id
            yield call(fetch, userUrl,{
              method: "DELETE"
            });
          }
        }

        const usersBaseNew = yield call(() => {
          return fetch(url)
                  .then(res => res.json())
          }
        );
        
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
