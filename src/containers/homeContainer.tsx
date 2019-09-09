import { HomeComponent } from "../components/Home/homeComponent";
import { connect } from "react-redux";
import { booksStore } from "../redux/books/actions";
import { RootState } from '../redux/rootReducer'

const mapStateToProps = (state: RootState) => ({
    books: state.books.books,
    isBooksLoading: state.books.isBooksLoading
});
  
const mapDispatchToProps = {
    booksStore
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);