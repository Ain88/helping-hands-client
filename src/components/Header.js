import React from "react"
import { Nav, Navbar, NavLink } from 'react-bootstrap'
import {Link} from 'react-router-dom'
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
              <NavLink href="about">About</NavLink>
              <NavLink href="tovolunteer">To Volunteer</NavLink>
              <NavLink href="needvolunteer">Need Volunteer</NavLink>
              <NavLink href="contact">Contact</NavLink>
              {
                props.loggedInStatus ?
                  <NavLink href="logout" onClick={handleClick}>Log Out</NavLink>:

                  <NavLink href="login">Log In</NavLink>
              }
              {
                props.loggedInStatus ?
                  null :
                  <NavLink href="signup">Sign Up</NavLink>
              }
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        }
    <div><hr /></div></div>
    );
  }


export default Header
