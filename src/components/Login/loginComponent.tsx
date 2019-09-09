import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

export interface LoginProps {
    email: string;
    password: string;
    errors: string;
    snackbarOpen: boolean;
    history: {};
    doLogin: (o: object) => void;
    snackbarClose: any;
    isLoading: boolean;
    regEmail: string;
    regPassword: string;
}

export interface LoginState {
  email: string;
  password: string;
}

export class LoginComponent extends React.Component<LoginProps, LoginState>{
  state = {
    email: "",
    password: "",
    isLoading: false
   }

   componentDidMount() {
     this.setState({email: this.props.regEmail, password: this.props.regPassword})
   }

   handle = (event: any) =>
      this.setState({ [event.target.name]: event.target.value } as any);
 
   login = (e: React.MouseEvent<HTMLElement>) => {
      const { history } = this.props;
      this.props.doLogin({ 
        email: this.state.email, 
        password: this.state.password,
        history 
      });
      e.preventDefault();
   }

  handleCloseSnackbar() {
    this.props.snackbarClose();
  }

  render() {
    return (
        <div>
            <h2>Login</h2>
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
                  <Button style={{marginTop: "26px"}} variant="contained" color="primary" onClick={(e) => {this.login(e) }}>
                    Логин
                  </Button>
              </form>
              {this.props.isLoading ? <LinearProgress /> : null }
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