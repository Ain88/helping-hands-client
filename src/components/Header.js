import React from "react"
import { Nav, Navbar, NavLink } from 'react-bootstrap'
import axios from 'axios'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  handleClick = async (e) => {
    e.preventDefault()
    console.log("user loggin out")
    const response = await axios.delete('http://localhost:3001/logout', {withCredentials: true})
    // .then(response => {
      this.props.handleLogout()
      // this.props.history.push('/')
    // })
    // .catch(error => console.log(error))
  }

  render () {

    return ( <div className="container container-header">
        {
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Helping Hands in Vancity</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">

              <NavLink href="tovolunteer">Volunteer Today</NavLink>

              {
                window.localStorage.rememberMe === 'true' ? <NavLink href="/" onClick={this.handleClick}>Log Out</NavLink>: null
              }
              {
                window.localStorage.rememberMe === 'false' ?
                <><NavLink href="signup">Sign Up</NavLink><NavLink href="login">Log In</NavLink></> : null
              }
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        }
    <div><hr /></div></div>
    );
  }
}


export default Header
