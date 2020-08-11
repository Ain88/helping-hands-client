import React, { Component } from 'react';
import './App.scss';
import axios from 'axios'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home'
import Tovolunteer from './components/Tovolunteer'
import Needvolunteer from './components/Needvolunteer'
import Mypage from './components/Mypage'
import Myrequest from './components/Myrequest'
import Mymessage from './components/Mymessage'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './components/registrations/Login'
import Signup from './components/registrations/Signup'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {},
      user_id : ""
     };
  }
  componentDidMount() {
      this.loginStatus()
    }
  loginStatus = () => {
      axios.get('http://localhost:3001/logged_in', {withCredentials: true})
      .then(response => {
        if (response.data.logged_in) {
          this.setState({
            user_id: response.data.user.id
          })
          this.handleLogin(response)
        } else {
          this.handleLogout()
        }
      })
      .catch(error => console.log('api errors:', error))
    }
  handleLogin = (response) => {
      this.setState({
        isLoggedIn: true,
        user: response.user
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
            <Header {...props} showLoggedIn={this.state.showLoggedIn} loggedInStatus={this.state.isLoggedIn}/>
            )}
          />
            <Switch>
              <Route
                exact path='/'
                render={props => (
                <Home {...props} loggedInStatus={this.state.isLoggedIn}/>
                )}
              />
              <Route
                exact path='/Needvolunteer'
                render={props => (
                <Needvolunteer {...props} loggedInStatus={this.state.isLoggedIn}/>
                )}
              />
              <Route
                exact path='/Tovolunteer'
                render={props => (
                <Tovolunteer {...props} user_no={this.state.user_id} loggedInStatus={this.state.isLoggedIn}/>
                )}
              />
              <Route
                exact path='/mypage'
                render={props => (
                <Mypage {...props} user_no={this.state.user_id} loggedInStatus={this.state.isLoggedIn}/>
                )}
              />
              <Route
                exact path='/myrequest'
                render={props => (
                <Myrequest {...props} user_no={this.state.user_id} loggedInStatus={this.state.isLoggedIn}/>
                )}
              />
              <Route
                exact path='/mymessage'
                render={props => (
                <Mymessage {...props} loggedInStatus={this.state.isLoggedIn}/>
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
