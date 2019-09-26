import { LoginTypes } from '../../types/reducerTypes'

export const initialState: LoginTypes = {
  email: "",
  isLoading: false,
  auth: false,
  errors: '',
  roles: '',
  img: '',
  id: '',
  snackbarOpen: false,
  userBooks: {},
  sortUserBooks: [],
  totalPrice: 0,
  isBasketLoading: false,
  isChangeAvatarLoading: false,
  isAuthLoading: false
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
      const { email, roles, img, id, userBooks, sortUserBooks, totalPrice } = action.payload;
      return {
      ...state,
      email,
      roles,
      isLoading: false,
      auth: true,
      snackbarOpen: false,
      img,
      id,
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
      isAuthLoading: false,
      snackbarOpen: true
      };
   }

   case `DO_LOGOUT`: {
      return {
      ...state,
      auth: false,
      email: '',
      password: ''
      };
  }

  case `DO_AUTH`: {
    return {
    ...state,
    isAuthLoading: true
    };
  }

  case `DO_AUTH_SUCCESS`: {
    const { auth, email, roles, id, img, userBooks, sortUserBooks, totalPrice } = action.data;
    return {
      ...state,
      auth,
      email,
      roles,
      id,
      img,
      userBooks,
      sortUserBooks,
      totalPrice,
      isAuthLoading: false
    };
  }

  case `DO_AUTH_FAILED`: {
    return {
    ...state,
      auth: false,
      isAuthLoading: false
    };
  }

  case `PROFILE_CHANGES`: {
    return {
    ...state,
    isChangeAvatarLoading: true
    };
  }

  case `USER_CHANGE_AVATAR`: {
    const { img } = action.payload;
    return {
    ...state,
    img,
    isChangeAvatarLoading: false
    };
  }

  case `USER_ADD_BOOK`: {
    return {
      ...state,
      isBasketLoading: true
    }
  }

  case `ADD_BOOK_TO_CART`: {
    const { userBooks, sortUserBooks, totalPrice } = action.payload;
    return {
    ...state,
    userBooks,
    sortUserBooks,
    totalPrice,
    isBasketLoading: false
    };
  }

  case `USER_REMOVE_BOOK`: {
    return {
      ...state,
      isBasketLoading: true
    }
  }

  case `REMOVE_BOOK_FROM_CART`: {
    const { userBooks, sortUserBooks, totalPrice } = action.payload;
    return {
    ...state,
    userBooks,
    sortUserBooks,
    totalPrice,
    isBasketLoading: false
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