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

    axios.post(`http://localhost:3001/enrollments`, { enrollment }, {withCredentials: true})
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
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
