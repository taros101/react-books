import { BookComponent } from "../components/Book/bookComponent";
import { booksStore } from "../redux/books/actions";
import { addBookToCart } from "../redux/login/action";
import { connect } from "react-redux";
import { RootState } from '../redux/rootReducer'

const mapStateToProps = (state: RootState) => ({
    books: state.books.books,
    userEmail: state.login.email,
    userBooks: state.login.userBooks,
    email: state.login.email,
    img: state.login.img,
    id: state.login.id
});
  
const mapDispatchToProps = {
    booksStore, addBookToCart
};
  
export default connect(mapStateToProps, mapDispatchToProps)(BookComponent);