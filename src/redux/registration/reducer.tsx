import { RegistrationTypes } from '../../types/reducerTypes'

export const initialState: RegistrationTypes = {
    email: "",
    password: "",
    isLoading: false,
    errors: "",
    userType: "",
    img: "",
    userBooks: [],
    snackbarOpen: false
  };
  
  export function registrationReducer(state: any = initialState, action: any) {
    switch (action.type) {
      case `DO_REGISTRATION`: {
          return {
             isLoading: true
          };
      }

      case `REGISTRATION_SUCCESS`: {
        const { email, password, img } = action.payload;
          return {
          ...state,
          email,
          password,
          img,
          isLoading: false,
          userType: 'user',
          snackbarOpen: false
        }
     }

     case `REGISTRATION_ERRORS`: {
      const { errors } = action.payload;
        return {
        ...state,
        isLoading: false,
        errors,
        snackbarOpen: true
      }
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
  
  export const registration = (state: any) => state.registration;