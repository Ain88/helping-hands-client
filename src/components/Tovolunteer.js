import React from "react";
import L from "leaflet";
import axios from 'axios'
import { Container, Row, Col, Nav, Tabs, Tab, Button } from 'react-bootstrap'
import Needvolunteer from './Needvolunteer'
import Mypage from './Mypage'
import Myrequest from './Myrequest'
import Mymarker from './Mymarker'
import Mymessage from './Mymessage'
import $ from 'jquery';
import { render } from 'react-dom'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const mapStyle = {
    height: "500px"
};

const position = [49.2827, -123.1207]

var greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
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
      data2: [],
      check_count: '',
      waiting: false,
      check_req: []
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3001/requests`)
      .then(res => res.json())
      .then(json => this.setState({ data: json }));

    fetch(`http://localhost:3001/enrollments`)
      .then(res => res.json())
      .then(json => { this.setState({ data2: json });
      var arrayOfArrays = [];

      Object.keys(json).forEach(function(k){
        arrayOfArrays.push(json[k].request_id);
      });
        this.check_count = Object.keys(json).length;
        this.state.check_req = arrayOfArrays
        console.log(this.state.check_req)
        this.checkWaiting()
      });
  }

  checkWaiting(){
    this.setState({ waiting: true})
  }

  renderMarkers() {
    var user_id = this.props.user_no
    var time_diff = new Date().getTime() - (60 * 60 * 1000)

    {return this.state.data.map((item,i) => { return (
       this.state.check_req.indexOf(item.id) == -1 && user_id != item.owner_id && item.typev == 1 && time_diff > new Date(item.created_at).getTime() ?

       <Mymarker
       icon={greenIcon}
       key={item.id}
       title={item.title}
       type={item.typev}
       description={item.description}
       created_at={time_diff}
       owner_id={item.owner_id}
       req_id={item.id}
       user_id={user_id}
       position={[item.location.split(',')[0],item.location.split(',')[1]]}
       onClick={this.onMarkerClick}
       /> : (this.state.check_req.indexOf(item.id) == -1 && user_id != item.owner_id && item.typev == 2 && time_diff > new Date(item.created_at).getTime() ?
         <Mymarker
         icon={blueIcon}
         key={item.id}
         type={item.typev}
         title={item.title}
         owner_id={item.owner_id}
         req_id={item.id}
         user_id={user_id}
         created_at={time_diff}
         description={item.description}
         position={[item.location.split(',')[0],item.location.split(',')[1]]}
         onClick={this.onMarkerClick}
         /> : null)
     )}
      )}
  }

  render() {
    const { renderMarkers, waiting, check_req } = this.state
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
            <Needvolunteer user_no={this.props.user_no}/>
          </Tab>
          <Tab eventKey="message" title="Message">
            <Mymessage user_no={this.props.user_no}/>
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
          {this.state.waiting == true && this.renderMarkers()}

        </Map>

        </Col>
        </Row><br />
        </Container>
        </div>

    )
  }
}

export default Tovolunteer;
