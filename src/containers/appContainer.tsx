import { App } from "../App";
import { connect } from "react-redux";
import { doAuth } from "../redux/login/action";

const mapStateToProps = (state: any) => ({
    auth: state.login.auth,
    email: state.login.email,
    password: state.login.password,
    userType: state.login.userType,
    img: state.login.img,
    userBooks: state.login.userBooks
});
  
const mapDispatchToProps = {
    doAuth
};
  
export default connect(mapStateToProps, mapDispatchToProps)(App);