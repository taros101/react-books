import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import HomeComponent from "./containers/homeContainer";
import LoginComponent from "./containers//loginContainer";
import RegistrationComponent from "./containers/registrationContainer";
import AdminComponent from "./containers/adminContainer";
import ProfileComponent from "./containers/profileContainer";
import NavComponent from './containers/navContainer';

export interface AppProps {
  doAuth: (o: object) => void;
}

export interface AppState {
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    const localStore = JSON.parse(localStorage.getItem('userAuth') || '{}')
  
    this.props.doAuth({
      auth: localStore.auth,
      email: localStore.email,
      password: localStore.password,
      userType: localStore.userType,
      img: localStore.img,
      userBooks: localStore.userBooks,
      sortUserBooks: localStore.sortUserBooks,
      totalPrice: localStore.totalPrice,
    })
  }

  render() {
    return (
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
    )
  }
}

