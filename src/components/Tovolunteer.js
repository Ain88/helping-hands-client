import React from "react";
import L from "leaflet";
import axios from 'axios'
import { Container, Row, Col, Nav, Tabs, Tab, Button } from 'react-bootstrap'
import Needvolunteer from './Needvolunteer'
import Mypage from './Mypage'
import Myrequest from './Myrequest'
import $ from 'jquery';

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
    };
  }

  submitHelp = () => {
    alert("hello")
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

    data.forEach(function(point){
        if(point.owner_id != user_id && point.typev == "1" && point.is_active == "1" &&
        point.counter-point.cur_counter > 0){
          var eventType = "One time help"
          var latlong =  point.location.split(',');
          var lat = parseFloat(latlong[0]);
          var long = parseFloat(latlong[1]);
          var marker = L.marker([lat,long],{icon: greenIcon}).addTo(map);
        }
        else if (point.owner_id != user_id && point.typev == "2" && point.is_active == "1" &&
        point.counter-point.cur_counter > 0) {
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
        this.bindPopup( `
        <form class="popup-form role="form" id="form" onsubmit="return submitHelp('hello');">
          <div class="form-group">
            Type: ${eventType} <br />
            Title: ${point.title} <br />
            Description: ${point.description} <br />
          </div>
          <div class="text-center">
            <input type="submit" value="I want to Help" class= "submit-button btn btn-outline-info btn-sm ml-auto">
            </input>
          </div>
        </form>
        `).on("popupopen", () => {
              $(".submit-button").on("click", e => {
                e.preventDefault();
                if (window.confirm(`Are you sure you want to submit the request?`))
                {

                }
              }); });
          }
      });
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
          <div id="map" style={mapStyle} />
        </Col>
        </Row><br />
        </Container>
        </div>

    )
  }
}

export default Tovolunteer;
