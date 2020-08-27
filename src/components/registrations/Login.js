import React, { Component, useState } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Form, Button, Alert } from 'react-bootstrap'

function AlertDismissibleExample() {
const [show, setShow] = useState(true);

if (show) {
  return (
    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
      <p>
      </p>
    </Alert>
  );
}
return '';
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: '',
      rememberMe: false
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
    const {email, password, rememberMe} = this.state
    localStorage.setItem('rememberMe', true);
    let user = {
      email: email,
      password: password
    }

    axios.post('http://localhost:3001/login', {user}, {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.props.handleLogin(response.data)
        this.redirect()
      } else {
        this.setState({
          errors: response.data.errors
        })
      }
    })
    .catch(error => console.log('api errors:', error))
  };
  redirect = () => {
    this.props.history.push('/')
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

      <Button variant="primary" type="submit">
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
