import { NavComponent } from "../components/Nav/navComponent"
import { connect } from "react-redux";
import { doLogout, addBookToCart, removeBookFromCart } from "../redux/login/action";

const mapStateToProps = (state: any) => ({
    auth: state.login.auth,
    email: state.login.email,
    password: state.login.password,
    userType: state.login.userType,
    img: state.login.img,
    userBooks: state.login.userBooks,
    sortUserBooks: state.login.sortUserBooks,
    totalPrice: state.login.totalPrice
});
  
const mapDispatchToProps = {
    doLogout, addBookToCart, removeBookFromCart,
};
  
export default connect(mapStateToProps, mapDispatchToProps)(NavComponent);