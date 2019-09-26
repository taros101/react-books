import { AdminComponent } from "../components/Admin/adminComponent";
import { connect } from "react-redux";
import { admin, 
         modalClose, 
         modalOpen, 
         addBookModalOpen, 
         addBookModalClose ,
         adminsEdit,
         modalOpenDelete,
         modalCloseDelete
        } from "../redux/admin/actions";
import { booksStore, snackbarClose } from "../redux/books/actions";
import { RootState } from '../redux/rootReducer'

const mapStateToProps = (state: RootState) => ({
    usersBase: state.admin.usersBase,
    modal: state.admin.modal,
    modalDelete: state.admin.modalDelete,
    snackbarOpen: state.books.snackbarOpen,
    errors: state.books.errors,
    books: state.books.books,
    addBookModal: state.admin.addBookModal,
    isAdminEditing: state.admin.isAdminEditing
});
  
  const mapDispatchToProps = {
    admin, modalClose, modalOpen, booksStore, snackbarClose, addBookModalOpen, addBookModalClose, adminsEdit, modalOpenDelete, modalCloseDelete
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(AdminComponent);