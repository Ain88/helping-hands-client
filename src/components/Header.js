import React from "react"
import { Nav, Navbar, NavLink } from 'react-bootstrap'
import axios from 'axios'

const Header = (props) => {
const handleClick = () => {
    axios.delete('http://localhost:3001/logout', {withCredentials: true})
    .then(response => {
      props.handleLogout()
      props.history.push('/')
    })
    .catch(error => console.log(error))
  }
    return ( <div className="container container-header">
        {
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Helping Hands in Vancity</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
              <NavLink href="tovolunteer">Volunteer Today</NavLink>
              {
                props.loggedInStatus && <NavLink href="/" onClick={handleClick}>Log Out</NavLink>}
              {
                !props.loggedInStatus &&
                <><NavLink href="signup">Sign Up</NavLink><NavLink href="login">Log In</NavLink></>
              }

              </Nav>
            </Navbar.Collapse>
          </Navbar>
        }
    <div><hr /></div></div>
    );
  }


export default Header
