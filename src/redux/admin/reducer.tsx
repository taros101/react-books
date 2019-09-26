import { AdminTypes } from '../../types/reducerTypes'

export const initialState: AdminTypes = {
    usersBase: [],
    modal: false,
    errors: '',
    snackbarOpen: false,
    addBookModal: false,
    isAdminEditing: false,
    modalDelete: false
  };
  
  export function adminReducer(state: AdminTypes = initialState, action: any) {
    switch (action.type) {
      case `ADMIN`: {
          return {
          ...state,
          addBookModal: false
          };
      }

      case `USERS_BASE`: {
        const { usersBase } = action.payload;
        return {
        ...state,
        usersBase
        };
      }

      case `ADMINS_EDIT`: {
        return {
        ...state,
        isAdminEditing: true
        };
      }

      case `USER_DELETE`: {
        const { usersBaseNew } = action.payload;
        
        return {
        ...state,
        usersBase: usersBaseNew,
        isAdminEditing: false
        };
      }

      case `USER_EDIT`: {
        const { usersBaseNew } = action.payload;
        return {
        ...state,
        usersBase: usersBaseNew,
        isAdminEditing: false
        };
      }

      case `MODAL_OPEN`: {
        return {
          ...state,
          modal: true
        };
      }

      case `MODAL_CLOSE`: {
        return {
          ...state,
          modal: false
        };
      }

      case `MODAL_OPEN_DELETE`: {
        return {
          ...state,
          modalDelete: true
        };
      }

      case `MODAL_CLOSE_DELETE`: {
        return {
          ...state,
          modalDelete: false
        };
      }

      case `ADD_BOOK_MODAL_OPEN`: {
        return {
          ...state,
          addBookModal: true
        };
      }

      case `ADD_BOOK_MODAL_CLOSE`: {
        return {
          ...state,
          addBookModal: false
        };
      }

      case `ADMIN_ERROR`: {
        const { errors } = action.payload;
        return {
          ...state,
          errors
        };
      }
   
      default:
        return state;
    }
  }
  
  export const admin = (state: any) => state.admin;