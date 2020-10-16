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
    const response = await axios.delete('https://help-van.herokuapp.com/logout', {withCredentials: true})
    // .then(response => {
      this.props.handleLogout()
      window.location.assign('/')
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
              {
                window.localStorage.rememberMe === 'true' ?
                <><NavLink href="mypage">My Volunteer</NavLink>
                <NavLink href="myrequest">My Request</NavLink>
                <NavLink href="needvolunteer">Need Volunteer</NavLink>
                <NavLink href="mymessage">Message</NavLink>
                <NavLink href="/" onClick={this.handleClick}>Log Out</NavLink></>
                :
                <><NavLink href="signup">Sign Up</NavLink><NavLink href="login">Log In</NavLink></>
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
