import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button } from 'react-bootstrap'
import Tovolunteer from './Tovolunteer'

class Mymarker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  onMarkerClick() {
    console.log('bar');

  }

  render() {
    return (
      <Marker
      icon={this.props.icon}
      position={this.props.position}>
        <Popup>
          Title: {this.props.title}<br />
          Description: {this.props.description}<br /><br />
          <Button className="text-center" variant="outline-info" size="sm" onClick={this.onMarkerClick}>
            Submit The Request
          </Button>
        </Popup>
      </Marker>
    );
  }
}

export default Mymarker;
