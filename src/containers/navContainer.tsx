import { NavComponent } from "../components/Nav/navComponent"
import { connect } from "react-redux";
import { doLogout, addBookToCart, removeBookFromCart } from "../redux/login/action";
import { RootState } from '../redux/rootReducer'

const mapStateToProps = (state: RootState) => ({
    auth: state.login.auth,
    email: state.login.email,
    roles: state.login.roles,
    img: state.login.img,
    userBooks: state.login.userBooks,
    sortUserBooks: state.login.sortUserBooks,
    totalPrice: state.login.totalPrice,
    isBasketLoading: state.login.isBasketLoading,
    id: state.login.id
});
  
const mapDispatchToProps = {
    doLogout, addBookToCart, removeBookFromCart,
};
  
export default connect(mapStateToProps, mapDispatchToProps)(NavComponent);