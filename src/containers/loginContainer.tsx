import { LoginComponent } from "../components/Login/loginComponent"
import { connect } from "react-redux";
import { doLogin, snackbarClose } from "../redux/login/action";
import { RootState } from '../redux/rootReducer'

const mapStateToProps = (state: RootState) => ({
    email: state.login.email,
    errors: state.login.errors,
    snackbarOpen: state.login.snackbarOpen,
    isLoading: state.login.isLoading,
    regEmail: state.registration.email,
    regPassword: state.registration.password,
});
  
const mapDispatchToProps = {
    doLogin, snackbarClose
};
  
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);