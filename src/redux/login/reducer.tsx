import { LoginTypes } from '../../types/reducerTypes'

export const initialState: LoginTypes = {
  email: "",
  password: "",
  isLoading: false,
  auth: false,
  errors: '',
  userType: '',
  img: '',
  snackbarOpen: false,
  userBooks: [],
  sortUserBooks: [],
  totalPrice: 0
};

export function loginReducer(state: LoginTypes = initialState, action: any) {
  switch (action.type) {
    case `DO_LOGIN`: {
        return {
        ...state,
        isLoading: true,
        auth: false
        };
    }

    case `LOGIN_SUCCESS`: {
      const { email, password, userType, img, userBooks, sortUserBooks, totalPrice } = action.payload;
      return {
      ...state,
      email,
      password,
      userType,
      isLoading: false,
      auth: true,
      snackbarOpen: false,
      img,
      userBooks,
      sortUserBooks,
      totalPrice
      };
   }

    case `LOGIN_ERROR`: {
      const { errors } = action.payload;
      return {
      ...state,
      errors,
      isLoading: false,
      auth: false,
      snackbarOpen: true
      };
   }

   case `DO_LOGOUT`: {
      return {
      ...state,
      auth: false,
      email: '',
      password: '',
      userType: ''
      };
  }

  case `DO_AUTH`: {
    const { auth, email, password, userType, img, userBooks, sortUserBooks, totalPrice} = action.data;
    return {
      ...state,
      auth,
      email,
      password,
      userType,
      img,
      userBooks,
      sortUserBooks,
      totalPrice
    };
  }

  case `PROFILE_CHANGES`: {
    return {
    ...state
    };
  }

  case `USER_CHANGE_AVATAR`: {
    const { email, password, userType, img, userBooks, sortUserBooks, totalPrice } = action.payload;
    return {
    ...state,
    email,
    password,
    userType,
    img,
    userBooks,
    sortUserBooks,
    totalPrice
    };
  }

  case `ADD_BOOK_TO_CART`: {
    const { email, password, userType, img, userBooks, sortUserBooks, totalPrice } = action.payload;
    return {
    ...state,
    email,
    password,
    userType,
    img,
    userBooks,
    sortUserBooks,
    totalPrice
    };
  }

  case `REMOVE_BOOK_FROM_CART`: {
    const { email, password, userType, img, userBooks, sortUserBooks, totalPrice } = action.payload;
    return {
    ...state,
    email,
    password,
    userType,
    img,
    userBooks,
    sortUserBooks,
    totalPrice
    };
  }

  case `SORT_USER_BOOKS`: {
    const { sortUserBooks } = action.payload;
    return {
    ...state,
    sortUserBooks
    };
  }

  case `SNACKBAR_CLOSE`: {
    return {
      ...state,
      snackbarOpen: false
    };
  }
 
    default:
      return state;
  }
}

export const login = (state: any) => state.login;