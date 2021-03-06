import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      f_name: '',
      l_name: '',
      email: '',
      photo: null,
      preview: '',
      password: '',
      password_confirmation: '',
      errors: ''
     };
  }
  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };
  handleChange2 = (event) => {
    this.setState({
      preview: event.target.value,
      photo: event.target.files[0],
    })
};

handleSubmit = (event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append('f_name', this.state.f_name);
  formData.append('l_name', this.state.l_name);
  formData.append('email', this.state.email);
  formData.append('password', this.state.password);
  formData.append('password_confirmation', this.state.password_confirmation);
  formData.append('photo', this.state.photo);

  fetch(`https://help-van.herokuapp.com/users`, {
    method: 'POST',
    body: formData,
    withCredentials: true
  }).then(response => response.json()).then(
    data => {
          if (data.status === 'created') {
            alert("Signed up successfully");
            this.props.handleLogin(data)
            window.location.assign('/login')
          } else {
            this.setState({
              errors: data.errors
            })
      }}
    )
  .catch(error=>console.log(error));
};

  redirect = () => {
    this.props.history.push('/')
  }
  handleErrors = () => {
    return (
      <div>
        <ul>{this.state.errors.map((error) => {
          return <li key={error}>{error}</li>
        })}</ul>
      </div>
    )
  }
  render() {
    const {f_name, l_name, email, preview, password, password_confirmation} = this.state;

    return (
      <div className= "container content">
      <h3 className= "center">Sign Up</h3><br />
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={this.handleChange}/>
        </Form.Group>

        <Form.Group controlId="formFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="Enter first name" name="f_name" value={f_name} onChange={this.handleChange}/>
        </Form.Group>

        <Form.Group controlId="formLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Enter last name" name="l_name" value={l_name} onChange={this.handleChange}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={this.handleChange}/>
        </Form.Group>

        <Form.Group controlId="formBasicPasswordConfirm">
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control type="password" placeholder="Password confirmation" name="password_confirmation" value={password_confirmation} onChange={this.handleChange}/>
        </Form.Group>

        <Form.Group>
        <Form.File
          id="exampleFormControlFile1"
          label="Copy of a government-approved ID (approved formats: .jpg, .png, .pdf)"
          type="file"
          name= "preview"
          value={preview}
          onChange={this.handleChange2}
           />
        </Form.Group>

      <Button variant="info" type="submit">
        Sign Up
      </Button>
      <div>
          or <Link to='/login'>Log In</Link>
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
export default Signup;
