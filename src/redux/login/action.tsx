export const doLogin = (data: object) => ({ type: "DO_LOGIN", data });
export const doLogout = () => ({ type: "DO_LOGOUT"});
export const doAuth = (data: object) => ({ type: "DO_AUTH", data });
export const snackbarClose = () => ({ type: "SNACKBAR_CLOSE" });
export const profileChanges = (payload: object) => ({ type: "PROFILE_CHANGES", payload });
export const addBookToCart = (payload: object) => ({ type: "USER_ADD_BOOK", payload });
export const removeBookFromCart = (payload: object) => ({ type: "USER_REMOVE_BOOK", payload });
export const sortBooks = (payload: object) => ({ type: "SORT_USER_BOOKS", payload });