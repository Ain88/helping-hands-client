import React, { Component } from 'react';
import './App.scss';
import axios from 'axios'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import { browserHistory } from 'react-router';
import Home from './components/Home'
import Tovolunteer from './components/Tovolunteer'
import Needvolunteer from './components/Needvolunteer'
import Mypage from './components/Mypage'
import Mymarker from './components/Mymarker'
import Myrequest from './components/Myrequest'
import Mymessage from './components/Mymessage'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './components/registrations/Login'
import Signup from './components/registrations/Signup'
import Stat from './components/Stat'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {},
      user_id : "",
      stat: "",
      req_list: [],
      req: ""
     };
  }

  UNSAFE_componentWillMount() {
      this.loginStatus()
    }

  componentDidMount(){
    axios.get(`http://localhost:3001/requests`, {withCredentials: true})
      .then(res => {
        const req_list = res.data;
        this.setState({ req_list });
      })
      .catch(function (error) {
        console.log(error);
      });
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
      console.log("logging out")
      window.localStorage.removeItem('rememberMe');
      window.localStorage.setItem('rememberMe', false);
      this.setState({
      isLoggedIn: false,
      user: {}
      })
      this.redirect();
    }
  redirect = () => {
    // this.props.history.push('/')
  }

  render() {
      return (
        <div>
          <BrowserRouter>
          <Route
            render={props => (
            <Header {...props} user_no={this.state.user_id} loggedInStatus={this.state.isLoggedIn} handleLogout={this.handleLogout}/>
          )} />
              <Route
                exact path='/'
                render={props => (
                <Home {...props} />
                )}
              />
              <Route
              exact path='/Stat'
              render={props => (
                <Stat {...props} stat={this.state.stat} user_no={this.state.user_id} req={this.state.req_list.count}/>
               )}
              />
              <Route
                exact path='/Needvolunteer'
                render={props => (
                <Needvolunteer {...props} user_no={this.state.user_id} loggedInStatus={this.state.isLoggedIn}/>
                )}
              />
              <Route
              exact path='/Tovolunteer'
                render={props => (
                  localStorage.rememberMe === 'true' ? (
                <Tovolunteer {...props} user_no={this.state.user_id} />
              ): (
                window.confirm('Please login first'),
                <Redirect to={{ pathname: '/login', state: 'Please sign in first'}} {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
              )
                )}
              />

              <Route
                exact path='/mypage'
                render={props => (
                <Mypage {...props} user_no={this.state.user_id} />
                )}
              />
              <Route
                exact path='/myrequest'
                render={props => (
                <Myrequest {...props} user_no={this.state.user_id} />
                )}
              />
              <Route
                exact path='/mymessage'
                render={props => (
                <Mymessage {...props} user_no={this.state.user_id} loggedInStatus={this.state.isLoggedIn} />
                )}
              />
              <Route
                exact path='/mymarker'
                render={props => (
                <Mymarker {...props} user_no={this.state.user_id} />
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
            <Footer />
          </BrowserRouter>
        </div>
      );
    }
}
export default App;
