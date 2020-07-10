import React from "react"
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router';
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
              <Nav.Link href="about">About</Nav.Link>
              <Nav.Link href="tovolunteer">To Volunteer</Nav.Link>
              <Nav.Link href="needvolunteer">Need Volunteer</Nav.Link>
              <Nav.Link href="contact">Contact</Nav.Link>

              <Nav.Link href="login">Log In</Nav.Link>
              <Nav.Link href="signup">Sign Up</Nav.Link>
              {
                props.loggedInStatus ?
                  <Nav.Link href="logout" onClick={handleClick}>Log Out</Nav.Link>:
                null
              }
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        }
    <div><hr /></div></div>
    );
  }


export default Header
