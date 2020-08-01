import React from 'react';
import { Form, Button } from 'react-bootstrap'
import PlacesAutocomplete, {
  geocodeByAddress,
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
      type: '',
      description: '',
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
    const results = geocodeByAddress(address);
    const latLng = getLatLng(results[0]);
    this.setState({ address2: latLng });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const request = {
      type: this.state.type,
      title: this.state.title,
      description: this.state.description,
      location: this.state.address2
    };

    axios.post('http://localhost:3001/requests', { request })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
        .catch(err => {
        console.log(err);
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
    const {type, title, description, address, address2, errors} = this.state;
    return (
      <div className="container content">
  <h3 className="center">Need volunteers? Be an Organizer!</h3>
  <br />

  <Form onSubmit={this.handleSubmit}>
    <Form.Group controlId="theType">
      <Form.Label>Select type of volunteer</Form.Label>
      <Form.Control as="select" name="type" value={type} onChange={this.handleChange2}>
        <option>One time tasks</option>
        <option>Material need</option>
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
                      style,
                    })}
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
    <Button variant="primary" type="submit">
    Submit
    </Button>
  </Form>

</div>
    );
  }
}

export default Needvolunteer;
