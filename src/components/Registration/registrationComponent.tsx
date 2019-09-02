import React from 'react';
import AvatarImg from "../../img/avatar.jpg"
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export interface RegistrationProps {
  errors: string;
  snackbarOpen: boolean;
  history: any;
  doRegistration: (o: object) => void;
  snackbarClose: () => void;
}

export interface RegistrationState {
  email: string;
  password: string;
  secondPassword: string;
}

export class RegistrationComponent extends React.Component<RegistrationProps, RegistrationState> {
  state = {
    email: "",
    password: "",
    secondPassword: "",
  }

   handle = (event: any) =>
      this.setState({ [event.target.name]: event.target.value } as any);
 
   registration = (e: any)=>{
    e.preventDefault();
    const { history } = this.props;
    this.props.doRegistration({ 
      email: this.state.email, 
      password: this.state.password, 
      secondPassword: this.state.secondPassword, 
      img: AvatarImg,
      history
    });
   }

   handleCloseSnackbar() {
    this.props.snackbarClose();
  }

  render() {
    return (
        <div>
            <h2>Registration</h2>
            <Paper style={{width: "400px", margin: "0 auto"}}>
              <form >
                  <TextField
                    className="input"
                    label="Email"
                    margin="normal"
                    name="email"
                    value={this.state.email}
                    onChange={this.handle}
                  />
                  <TextField
                    className="input"
                    label="Пароль"
                    margin="normal"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handle}
                  />
                  <TextField
                    className="input"
                    label="Повторите пароль"
                    margin="normal"
                    name="secondPassword"
                    type="password"
                    value={this.state.secondPassword}
                    onChange={this.handle}
                  />
                  <Button style={{marginTop: "26px"}} variant="contained" color="primary" onClick={(e) => {this.registration(e) }}>
                    Зарегистрироваться
                  </Button>
              </form>
            </Paper>
            {
              this.props.snackbarOpen
              ? <Snackbar
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  open={this.props.snackbarOpen}
                  autoHideDuration={3000}
                  onClose={() => this.handleCloseSnackbar()}
                >
                  <SnackbarContent
                    aria-describedby="client-snackbar"
                    style={{backgroundColor: "#d32f2f"}}
                    message={
                      <span id="client-snackbar">
                        {this.props.errors}
                      </span>
                    }
                    action={[
                      <IconButton key="close" aria-label="close" color="inherit" onClick={() => this.handleCloseSnackbar()}>
                        <CloseIcon />
                      </IconButton>,
                    ]}
                  />
                </Snackbar>
              : ''
            }
        </div>
    )
  }
}