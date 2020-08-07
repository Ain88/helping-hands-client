import React from "react";
import L from "leaflet";
import axios from 'axios'
import { Container, Row, Col, Nav, Tabs, Tab } from 'react-bootstrap'
import Needvolunteer from './Needvolunteer'
import Mypage from './Mypage'

const mapStyle = {
    height: "500px"
};
var token = 'pk.eyJ1IjoiYWluODgiLCJhIjoiY2tkMGhkcXVmMHRxdzJ0cXJucHZvc2tuciJ9.PgKhmGn1K8y9BEVK2JW-og';
var mapboxUrl = 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}@2x?access_token=' + token;
var mapboxAttrib = 'Map data © <a href="http://osm.org/copyright">OpenStreetMap</a> contributors. Tiles from <a href="https://www.mapbox.com">Mapbox</a>.';
var mapbox = new L.TileLayer(mapboxUrl, {
  attribution: mapboxAttrib,
  tileSize: 512,
  zoomOffset: -1
});
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
      user_id: props.user_no
    };
  }

  componentDidMount(){
    this.map = new L.Map('map', {
        layers: [mapbox],
        center: [49.2827, -123.1207],
        zoom: 9,
        zoomControl: true
    });
  }

  async componentDidUpdate() {
    var map = this.map
    var { data } = await axios.get('http://localhost:3001/requests')

    var jsonFeatures = [];
    var user_id = this.props.user_no
    console.log(user_id)

    data.forEach(function(point){
        if(point.owner_id != user_id && point.typev == "1"){
          var eventType = "One time help"
          var latlong =  point.location.split(',');
          var lat = parseFloat(latlong[0]);
          var long = parseFloat(latlong[1]);
          var marker = L.marker([lat,long],{icon: greenIcon}).addTo(map);
        }
        else if (point.owner_id != user_id && point.typev == "2") {
          var eventType = "Material help"
          var latlong =  point.location.split(',');
          var lat = parseFloat(latlong[0]);
          var long = parseFloat(latlong[1]);
          var marker = L.marker([lat,long]).addTo(map);
        } else {
          var eventType = "Owner's request"
          var latlong =  point.location.split(',');
          var lat = parseFloat(latlong[0]);
          var long = parseFloat(latlong[1]);
          var marker = L.marker([lat,long])
        }

      marker.on('click', function () {
      if (!this._popup) { // when maker dont have pop up, this will bind popup and and open it
        this.bindPopup( "Type: " +eventType+"<br>"+
                        "Title: " +point.title+"<br>"+
                         "Description: " +point.description).openPopup();
          }
      });
    });
  }

  render() {
    const { user_id } = this.state;
    return (
        <Container>
        <Row>
        <Col xs={12} md={6}>


        <Tabs defaultActiveKey="mylist" transition={false} id="noanim-tab-example">
          <Tab eventKey="mylist" title="My List">
            <Mypage />
          </Tab>
          <Tab eventKey="request" title="Request Form">
            <Needvolunteer />
          </Tab>
          <Tab eventKey="message" title="Message">
            <p>{this.props.user_no}</p>
            <p>{this.props.user_no}</p>
          </Tab>
        </Tabs>
        </Col>
        <Col xs={12} md={6}>
          <div id="map" style={mapStyle} />
        </Col>
        </Row><br />
        </Container>

    )
  }
}

export default Tovolunteer;
