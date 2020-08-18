import React from "react";
import L from "leaflet";
import axios from 'axios'
import { Container, Row, Col, Nav, Tabs, Tab, Button } from 'react-bootstrap'
import Needvolunteer from './Needvolunteer'
import Mypage from './Mypage'
import Myrequest from './Myrequest'
import Mymarker from './Mymarker'
import Header from './Header'
import $ from 'jquery';
import { render } from 'react-dom'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const mapStyle = {
    height: "500px"
};

const position = [49.2827, -123.1207]

var greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

class Tovolunteer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marker_data: [],
      data: [],
      markers: [[49.2827, -123.1207], [49.2827, -123.1210]]
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3001/requests`)
      .then(res => res.json())
      .then(json => this.setState({ data: json }));
  }

  renderMarkers() {
    var user_id = this.props.user_no

    {return this.state.data.map((item,i) => { return (
       user_id != item.owner_id && item.typev == 1 ?
       <Mymarker
       icon={greenIcon}
       key={item.id}
       title={item.title}
       description={item.description}
       owner_id={item.owner_id}
       req_id={item.id}
       user_id={user_id}
       position={[item.location.split(',')[0],item.location.split(',')[1]]}
       onClick={this.onMarkerClick}
       /> : (user_id != item.owner_id && item.typev == 2 ?
         <Mymarker
         icon={blueIcon}
         key={item.id}
         title={item.title}
         owner_id={item.owner_id}
         req_id={item.id}
        user_id={user_id}
         description={item.description}
         position={[item.location.split(',')[0],item.location.split(',')[1]]}
         onClick={this.onMarkerClick}
         /> : null)
     )}
      )}
  }

  render() {
    const { renderMarkers } = this.state
    return (
      <div className ="center-col">
        <Container>
        <Row>
        <Col xs={12} md={6}>
        <Tabs defaultActiveKey="myVolunteer" transition={false} id="noanim-tab-example">
          <Tab eventKey="myVolunteer" title="My Volunteer">
            <Mypage user_no={this.props.user_no}/>
          </Tab>
          <Tab eventKey="myRequest" title="My Request">
            <Myrequest user_no={this.props.user_no}/>
          </Tab>
          <Tab eventKey="request" title="Request Form">
            <Needvolunteer />
          </Tab>
          <Tab eventKey="message" title="Message">

          </Tab>
        </Tabs>

        </Col>
        <Col xs={12} md={6}>
        <Map
          center={position}
          zoom={10}>
          <TileLayer
            url='https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWluODgiLCJhIjoiY2tkMGhkcXVmMHRxdzJ0cXJucHZvc2tuciJ9.PgKhmGn1K8y9BEVK2JW-og'
            attribution='Map data © <a href="http://osm.org/copyright">OpenStreetMap</a> contributors. Tiles from <a href="https://www.mapbox.com">Mapbox</a>.'
          />
          {this.renderMarkers()}

        </Map>

        </Col>
        </Row><br />
        </Container>
        </div>

    )
  }
}

export default Tovolunteer;
