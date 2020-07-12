import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      f_name: '',
      l_name: '',
      email: '',
      photo: '',
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
    event.preventDefault();

    const {name, value} = event.target
    this.setState({
      [name]: value
    })

    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
  }
  reader.readAsDataURL(file)
 }
  handleSubmit = (event) => {
    event.preventDefault()
    const {f_name, l_name, email, photo, password, password_confirmation} = this.state
    let user = {
      f_name: f_name,
      l_name: l_name,
      email: email,
      photo: photo,
      password: password,
      password_confirmation: password_confirmation
    }
  axios.post('http://localhost:3001/users', {user}, {withCredentials: true})
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
    const {f_name, l_name, email, photo, password, password_confirmation} = this.state;
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }
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

        <div className="imgPreview">
        {$imagePreview}
        </div>


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
      //
      //
      // <div>
      //   <h1>Sign Up</h1>
      //   <form onSubmit={this.handleSubmit}>
      //     <input
      //       placeholder="Email"
      //       type="text"
      //       name="email"
      //       value={email}
      //       onChange={this.handleChange}
      //     />
      //     <input
      //       placeholder="First Name"
      //       type="text"
      //       name="f_name"
      //       value={f_name}
      //       onChange={this.handleChange}
      //     />
      //     <input
      //       placeholder="Last Name"
      //       type="text"
      //       name="l_name"
      //       value={l_name}
      //       onChange={this.handleChange}
      //     />
      //     <input
      //       placeholder="Copy of a government-approved ID"
      //       type="text"
      //       name="photo"
      //       value={photo}
      //       onChange={this.handleChange}
      //     />
      //     <input
      //       placeholder="password"
      //       type="password"
      //       name="password"
      //       value={password}
      //       onChange={this.handleChange}
      //     />
      //     <input
      //       placeholder="password confirmation"
      //       type="password"
      //       name="password_confirmation"
      //       value={password_confirmation}
      //       onChange={this.handleChange}
      //     />
      //
      //     <button placeholder="submit" type="submit">
      //       Sign Up
      //     </button>
      //
      //   </form>
      //   <div>
      //     {
      //       this.state.errors ? this.handleErrors() : null
      //     }
      //   </div>
      // </div>
    );
  }
}
export default Signup;
