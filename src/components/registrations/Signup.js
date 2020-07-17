import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { DirectUpload } from 'activestorage';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      f_name: '',
      l_name: '',
      email: '',
      photo: '',
      photo2: '',
      password: '',
      password_confirmation: '',
      errors: '',
      imagePreviewUrl: ''
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
      photo: event.target.value,
      photo2: event.target.files[0]
    })
};

  handleSubmit = (event) => {
    event.preventDefault()
    const {f_name, l_name, email, password, password_confirmation, photo2} = this.state
    let user = {
      f_name: f_name,
      l_name: l_name,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    }
  axios.post('http://localhost:3001/users', {user}, {withCredentials: true})
    .then(data => this.uploadFile(this.state.photo2, data))
    .then(response => {
      if (response.data.status === 'created') {
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
  uploadFile = (file, user) => {
    const upload = new DirectUpload(file, 'http://localhost:3001/rails/active_storage/direct_uploads')
    upload.create((error, blob)=> {
      if(error) {
        console.log(error)
      } else {
        console.log('success')
      }
    })
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
    const {f_name, l_name, email, photo, photo2, password, password_confirmation} = this.state;

    return (
      <div className= "container content">
      <h2 className= "center">Sign Up</h2><br />
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
          name= "photo"
          value={photo}
          onChange={this.handleChange2}
           />
        </Form.Group>

      <Button variant="primary" type="submit">
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
