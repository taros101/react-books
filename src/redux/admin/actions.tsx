export const admin = () => ({ type: "ADMIN" });
export const adminsEdit = (payload: object) => ({ type: "ADMINS_EDIT", payload });
export const modalOpen = () => ({ type: "MODAL_OPEN"});
export const modalClose = () => ({ type: "MODAL_CLOSE"});

export const addBookModalOpen = () => ({ type: "ADD_BOOK_MODAL_OPEN"});
export const addBookModalClose = () => ({ type: "ADD_BOOK_MODAL_CLOSE"});