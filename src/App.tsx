import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import HomeComponent from "./containers/homeContainer";
import LoginComponent from "./containers//loginContainer";
import RegistrationComponent from "./containers/registrationContainer";
import AdminComponent from "./containers/adminContainer";
import ProfileComponent from "./containers/profileContainer";
import NavComponent from './containers/navContainer';
import CircularProgress from '@material-ui/core/CircularProgress';

export interface AppProps {
  doAuth: () => void;
  isAuthLoading: boolean;
}

export interface AppState {
  user: any;
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    
    this.props.doAuth();
  }

  render() {
    return (
      <div>
        { this.props.isAuthLoading
          ? <div className="progress">
              <CircularProgress style={{width: "60px", height: "60px"}}/>
            </div>
          : 
          <div className="App">
            <Router>
              <NavComponent props={this.props}/>

              <Route path="/" exact component={HomeComponent} />
              <Route path="/registration" component={RegistrationComponent} />
              <Route path="/login" component={LoginComponent} />
              <Route path="/admin" component={AdminComponent} />
              <Route path="/profile" component={ProfileComponent} />
          </Router>
        </div>
        }
      </div>
    )
  }
}

