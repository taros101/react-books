import { ProfileComponent } from "../components/Profile/profileComponent"
import { connect } from "react-redux";
import { profileChanges } from "../redux/login/action";

const mapStateToProps = (state: any) => ({
    email: state.login.email,
    img: state.login.img,
    sortUserBooks: state.login.sortUserBooks,
    totalPrice: state.login.totalPrice
  });
  
  const mapDispatchToProps = {
    profileChanges
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);