import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button } from 'react-bootstrap'
import Tovolunteer from './Tovolunteer'
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

  onMarkerClick () {
    const enrollment = {
      request_id: this.props.req_id,
      user_id: this.props.user_id,
      finished: 0
    };

    const message = {
      body: 'You are volunteering for [' +this.props.title + ']: Thank you for volunteering, you can message me if you have questions',
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
        this.redirect()
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
    const { req_id, user_id } = this.state
    return (
      <Marker
      icon={this.props.icon}
      position={this.props.position}>
      req_id={this.props.req_id}
      user_id={this.props.user_id}
        <Popup>
          Title: {this.props.title}<br />
          Type: {this.props.typev== 1 ? "One time help" : "Material help"}<br />
          Description: {this.props.description}<br /><br />
          <Button type="submit" className="text-center" variant="outline-info" size="sm" onClick={() =>
            { if (window.confirm('Are you sure you wish to submit the request?'))
            this.onMarkerClick() } }>Submit The Request
          </Button>
        </Popup>
      </Marker>
    );
  }
}

export default Mymarker;
