import { ProfileComponent } from "../components/Profile/profileComponent"
import { connect } from "react-redux";
import { profileChanges } from "../redux/login/action";
import { RootState } from '../redux/rootReducer'

const mapStateToProps = (state: RootState) => ({
    email: state.login.email,
    img: state.login.img,
    id: state.login.id,
    userBooks: state.login.userBooks,
    isChangeAvatarLoading: state.login.isChangeAvatarLoading
  });
  
  const mapDispatchToProps = {
    profileChanges
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);