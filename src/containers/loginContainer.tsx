import { LoginComponent } from "../components/Login/loginComponent"
import { connect } from "react-redux";
import { doLogin, snackbarClose } from "../redux/login/action";

const mapStateToProps = (state: any) => ({
    email: state.login.email,
    password: state.login.password,
    errors: state.login.errors,
    snackbarOpen: state.login.snackbarOpen,
});
  
const mapDispatchToProps = {
    doLogin, snackbarClose
};
  
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);