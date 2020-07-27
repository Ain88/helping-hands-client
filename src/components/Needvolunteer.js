import React from "react"
import { Form, Button } from 'react-bootstrap'


class Needvolunteer extends React.Component {
  render () {
    return (
      <div className="container content">
        <h3 className="center">Need volunteers? Be an Organizer!</h3>
        <br />

        <Form>
          <Form.Group controlId="theType">
            <Form.Label>Select type of volunteer</Form.Label>
            <Form.Control as="select">
              <option>One time tasks</option>
              <option>Material need</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="theTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group controlId="theDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows="3" />
          </Form.Group>
          <Form.Group controlId="theLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control as="textarea" rows="3" />
          </Form.Group>
          <Button variant="primary" type="submit">
          Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default Needvolunteer;
