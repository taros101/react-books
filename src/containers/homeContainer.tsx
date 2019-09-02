import { HomeComponent } from "../components/Home/homeComponent";
import { connect } from "react-redux";
import { booksStore } from "../redux/books/actions";

const mapStateToProps = (state: any) => ({
    books: state.books.books
});
  
const mapDispatchToProps = {
    booksStore
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);