import React from 'react';
import { Form, Button } from 'react-bootstrap'
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import axios from 'axios'

class Needvolunteer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      address2: '',
      title: '',
      typev: '',
      description: '',
      address_lat: '',
      address_lng: '',
      owner_id: '',
      counter: '',
      errors: ''
    };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleChange2 = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };

  handleSelect = address => {
    this.setState({ address })
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng =>
        this.setState({
          address2: latLng.lat + "," + latLng.lng
        })
      )
      .catch(error => console.error('Error', error));

  };

  handleSubmit = (event) => {
    event.preventDefault();


    fetch('http://localhost:3001/requests', {
      method: 'POST',
      headers:  {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },withCredentials: true,
      body: JSON.stringify({
        typev: this.state.typev,
        title: this.state.title,
        description: this.state.description,
        address: this.state.address,
        location: this.state.address2,
        counter: this.state.counter,
        cur_counter: 0,
        is_active: 1,
        owner_id: this.props.user_no
      })
    }).then(response => response.json()).then(
      data => {
            if (data.status === 'created') {
              alert("Your request has been added!");
              this.redirect()
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
    const {typev, title, description, address, address2, counter, errors} = this.state;
    return (
      <div className="container content">
      <h6><b>In need of volunteers? Please submit the form below.</b></h6>
      <br />

      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="theType">
        <Form.Label>Select type of volunteer</Form.Label>
        <Form.Control as="select" name="typev" value={typev} onChange={this.handleChange2}>
        <option value="">Select</option>
        <option value="1">One time tasks</option>
        <option value="2">Material need</option>
        </Form.Control>
        </Form.Group>
        <Form.Group controlId="theCounter">
        <Form.Label>How many volunteers do you need?</Form.Label>
        <Form.Control as="select" name="counter" value={counter} onChange={this.handleChange2}>
          <option value="">Select</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
        </Form.Control>
        </Form.Group>
        <Form.Group controlId="theTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" value={title} onChange={this.handleChange2} />
        </Form.Group>
        <Form.Group controlId="theDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows="3" name="description" value={description} onChange={this.handleChange2}/>
        </Form.Group>
        <Form.Group controlId="theLocation">
          <Form.Label>Location</Form.Label>
        <div>
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: 'Enter the address',
                    className: 'form-control'
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const key = (new Date()).getTime()+suggestion.index
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style
                        })}
                        key={key}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>
      </Form.Group>
    <Button variant="info" type="submit">
    Submit
    </Button>
  </Form>
  <div><br />
   {
     this.state.errors ? this.handleErrors() : null
   }
 </div>
</div>
    );
  }
}

export default Needvolunteer;
