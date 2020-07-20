import React, { Component } from 'react';
import './App.scss';
import axios from 'axios'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Tovolunteer from './components/Tovolunteer'
import Needvolunteer from './components/Needvolunteer'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './components/registrations/Login'
import Signup from './components/registrations/Signup'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
     };
  }
  componentDidMount() {
      this.loginStatus()
    }
  loginStatus = () => {
      axios.get('http://localhost:3001/logged_in', {withCredentials: true})
      .then(response => {
        if (response.data.logged_in) {
          this.handleLogin(response)
        } else {
          this.handleLogout()
        }
      })
      .catch(error => console.log('api errors:', error))
    }
  handleLogin = (data) => {
      this.setState({
        isLoggedIn: true,
        user: data.user
      })
    }
  handleLogout = () => {
      this.setState({
      isLoggedIn: false,
      user: {}
      })
    }
  render() {
      return (
        <div>
          <BrowserRouter>
          <Route
            render={props => (
            <Header {...props} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn}/>
            )}
          />
            <Switch>
              <Route
                exact path='/'
                render={props => (
                <Home {...props} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn}/>
                )}
              />
              <Route
                exact path='/tovolunteer'
                render={props => (
                <Tovolunteer {...props} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn}/>
                )}
              />
              <Route
                exact path='/needvolunteer'
                render={props => (
                <Needvolunteer {...props} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn}/>
                )}
              />
              <Route
                exact path='/login'
                render={props => (
                <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
                )}
              />
              <Route
                exact path='/signup'
                render={props => (
                <Signup {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
                )}
              />
            </Switch>
            <Footer />
          </BrowserRouter>
        </div>
      );
    }
}
export default App;
