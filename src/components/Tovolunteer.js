import React from "react";
import L from "leaflet";
import axios from 'axios'
import { Container, Row, Col, Nav, Tabs, Tab, Button } from 'react-bootstrap'
import Needvolunteer from './Needvolunteer'
import Mypage from './Mypage'
import Myrequest from './Myrequest'
import Mymarker from './Mymarker'
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

class Tovolunteer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marker_data: [],
      markers: [[49.2827, -123.1207], [49.2827, -123.1210]]
    };
  }

   componentDidMount(){
  }

  renderMarkers() {
   var user_id = this.props.user_no

   axios.get('http://localhost:3001/requests')
   .then(response => {
     this.data = response.data;
     this.data.forEach(function(point){
       if(point.owner_id != user_id && point.typev == "1" && point.is_active == "1" &&
       point.counter-point.cur_counter > 0){
         var eventType = "One time help"
         var latlong =  point.location.split(',');
         var lat = parseFloat(latlong[0]);
         var long = parseFloat(latlong[1]);
         // console.log("hello");

       }
       else if (point.owner_id != user_id && point.typev == "2" && point.is_active == "1" &&
       point.counter-point.cur_counter > 0) {
         var eventType = "Material help"
         var latlong =  point.location.split(',');
         var lat = parseFloat(latlong[0]);
         var long = parseFloat(latlong[1]);
       } else {
         var eventType = "Owner's request"
         var latlong =  point.location.split(',');
         var lat = parseFloat(latlong[0]);
         var long = parseFloat(latlong[1]);
       }
     });

   })
   .catch(function (error) {
     console.log(error);
   });

  }

  render() {
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
            {this.state.user_id}
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
