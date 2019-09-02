import { Reducer, combineReducers } from "redux";
import { loginReducer } from "./login/reducer";
import { registrationReducer } from "./registration/reducer";
import { adminReducer } from "./admin/reducer";
import { booksReducer } from "./books/reducer";
import { LoginTypes, AdminTypes, BooksTypes } from '../types/reducerTypes'
import { RegistrationTypes } from '../types/reducerTypes'

export interface RootState {
  login: LoginTypes;
  registration: RegistrationTypes;
  admin: AdminTypes;
  books: BooksTypes;
}

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  login: loginReducer,
  registration: registrationReducer,
  admin: adminReducer,
  books: booksReducer
});

export default rootReducer;