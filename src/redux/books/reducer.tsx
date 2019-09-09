import { BooksTypes } from '../../types/reducerTypes'

export const initialState: BooksTypes = {
    title: "",
    author: "",
    description: "",
    cover: "",
    price: "",
    books: [],
    errors: '',
    snackbarOpen: false,
    isBooksLoading: false
  };
  
  export function booksReducer(state: BooksTypes = initialState, action: any) {
    switch (action.type) {
      case `BOOKS_STORE`: {
          return {
          ...state
          };
      }

      case `BOOKS_STORE_SUCCESS`: {
        const { books } = action.payload;
        return {
        ...state,
        books
        };
    }
      case `CREATE_BOOK`: {
        const { bookTitle,
          bookAuthor,
          bookDescription,
          bookPrice,
          bookCover } = action.payload;
        return {
        ...state,
        title: bookTitle,
        author: bookAuthor,
        description: bookDescription,
        price: bookPrice,
        cover: bookCover
        };
    }

    case `BOOKS_LOADING_START`: {
      return {
        ...state,
        isBooksLoading: true
      };
    }

    case `BOOKS_LOADING_FINISH`: {
      return {
        ...state,
        isBooksLoading: false
      };
    }

    case `SNACKBAR_CLOSE`: {
      return {
        ...state,
        snackbarOpen: false
      };
    }

    case `BOOKS_ERROR`: {
      const { errors } = action.payload;
      return {
      ...state,
      errors,
      snackbarOpen: true
      };
  }

      default:
        return state;
    }
  }
  
  export const books = (state: any) => state.books;