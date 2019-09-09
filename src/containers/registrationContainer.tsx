import { RegistrationComponent } from "../components/Registration/registrationComponent"
import { connect } from "react-redux";
import { doRegistration, snackbarClose } from '../redux/registration/action';

const mapStateToProps = (state: any) => ({
    email: state.registration.email,
    password: state.registration.password,
    secondPassword: state.registration.secondPassword,
    errors: state.registration.errors,
    snackbarOpen: state.registration.snackbarOpen,
    isLoading: state.registration.isLoading
  });
  
  const mapDispatchToProps = {
    doRegistration, snackbarClose
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(RegistrationComponent);