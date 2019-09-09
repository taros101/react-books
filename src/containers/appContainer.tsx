import { App } from "../App";
import { connect } from "react-redux";
import { doAuth } from "../redux/login/action";
import { RootState } from '../redux/rootReducer'

const mapStateToProps = (state: RootState) => ({
    auth: state.login.auth,
    email: state.login.email,
    roles: state.login.roles,
    img: state.login.img,
    userBooks: state.login.userBooks,
    isAuthLoading: state.login.isAuthLoading
});
  
const mapDispatchToProps = {
    doAuth
};
  
export default connect(mapStateToProps, mapDispatchToProps)(App);