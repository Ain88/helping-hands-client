import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: ''
     };
  }
  componentWillMount() {
    return this.props.loggedInStatus ? this.redirect() : null
  }
  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };

  handleSubmit = (event) => {
    event.preventDefault()
    const {email, password} = this.state
    let user = {
      email: email,
      password: password
    }

    axios.post(`https://help-van.herokuapp.com/login`, {user}, {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response.data)
      } else {
        this.setState({
          errors: response.data.errors
        })
      }
    })
    .catch(error => console.log('api errors:', error))
  };
  redirect = () => {
    this.props.history.push('/mypage')
  }

  handleLogin = (response) => {
      this.setState({
        isLoggedIn: true,
        user: response.user
      })
      console.log(response.user)
      localStorage.setItem('rememberMe', true);
      localStorage.setItem('usersid', response.user.id);
      window.location.reload();
    }

  handleErrors = () => {
    return (
      <div>
        <ul>
        {this.state.errors.map(error => {
        return <li key={error}>{error}</li>
          })
        }
        </ul>
      </div>
    )
  }

  render() {
    const {email, password} = this.state
    return (
      <div className= "container content">
      <h3 className= "center">Log In</h3><br />
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={this.handleChange}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={this.handleChange}/>
        </Form.Group>

      <Button variant="info" type="submit">
        Log In
      </Button>
      <div>
          or <Link to='/signup'>sign up</Link>
      </div>
      </Form>
      <div>
      {
        this.state.errors ? this.handleErrors() : null
      }
    </div>
      </div>
    );
  }
}
export default Login;
