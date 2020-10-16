import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Button } from 'react-bootstrap'
import axios from 'axios'

class Mymarker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      req_id: null,
      user_id: null,
      finished: null
    };
  }

  componentDidMount() {
  }

  onMarkerClick() {
    const enrollment = {
      requests_id: this.props.req_id,
      users_id: this.props.user_id,
      finished: 0,
      check_mark: 0
    };

    const message = {
      body: 'Thank you for volunteering for [' +this.props.title + ']: Please reply to this message to confirm your attendance',
      requests_id: this.props.req_id,
      sender_id: this.props.owner_id,
      receiver_id: this.props.user_id
    }

    axios.all([
      axios.post(`http://localhost:3001/enrollments`, { enrollment }, {withCredentials: true}),
      axios.post(`http://localhost:3001/messages`, { message }, {withCredentials: true})
    ])
    .then(axios.spread((data1, data2) => {
        alert("Your enrollment has been added!");
        console.log('data1', data1, 'data2', data2);
    })).catch(error=>console.log(error));

  }

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
    return (
      <Marker
      icon={this.props.icon}
      position={this.props.position}>
      req_id={this.props.req_id}
      user_id={this.props.user_id}
        <Popup>
          Title: {this.props.title}<br />
          Type: {this.props.typev === "1" ? "One time help" : "Material help"}<br />
          Description: {this.props.description}<br />
          Location: {this.props.address}<br />
          Status: {this.props.status === 1 ? "Status: Fulfilled" : "Status: Unfulfilled"}<br /><br />
          <Button type="submit" className="text-center" variant="outline-info" size="sm" onClick={() =>
            { if (window.confirm('Are you sure you wish to fulfill request?'))
            this.onMarkerClick() } }>Fulfill This Request
          </Button>
        </Popup>
      </Marker>
    );
  }
}

export default Mymarker;
