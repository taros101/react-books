import { AdminComponent } from "../components/Admin/adminComponent";
import { connect } from "react-redux";
import { admin, 
         modalClose, 
         modalOpen, 
         addBookModalOpen, 
         addBookModalClose 
        } from "../redux/admin/actions";
import { booksStore, snackbarClose } from "../redux/books/actions";

const mapStateToProps = (state: any) => ({
    usersBase: state.admin.usersBase,
    modal: state.admin.modal,
    snackbarOpen: state.books.snackbarOpen,
    errors: state.books.errors,
    books: state.books.books,
    addBookModal: state.admin.addBookModal
  });
  
  const mapDispatchToProps = {
    admin, modalClose, modalOpen, booksStore, snackbarClose, addBookModalOpen, addBookModalClose
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(AdminComponent);