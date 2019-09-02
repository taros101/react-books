import { BookComponent } from "../components/Book/bookComponent";
import { booksStore } from "../redux/books/actions";
import { addBookToCart } from "../redux/login/action";
import { connect } from "react-redux";

const mapStateToProps = (state: any) => ({
    books: state.books.books,
    userEmail: state.login.email
});
  
const mapDispatchToProps = {
    booksStore, addBookToCart
};
  
export default connect(mapStateToProps, mapDispatchToProps)(BookComponent);