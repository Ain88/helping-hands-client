import React from 'react';
import L from "leaflet";
import { Container, Row, Col, Tabs, Tab, Button } from 'react-bootstrap'
import Needvolunteer from './Needvolunteer'
import Mypage from './Mypage'
import Myrequest from './Myrequest'
import Mymarker from './Mymarker'
import Mymessage from './Mymessage'
import { Map, TileLayer } from 'react-leaflet';
import axios from 'axios';

const position = [49.2527, -122.9805]

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

function groupBy(xs, f) {
  return xs.reduce((r, v, i, a, k = f(v)) => (((r[k] || (r[k] = [])).push(v), r)), {})
}

class Tovolunteer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marker_data: [],
      data: [],
      data2: [],
      data3: [],
      check_count: '',
      waiting: false,
      check_req: [],
      result: [],
      total_count: '',
      enr_check: '',
      req_channel: []
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3001/requests`)
      .then(res => res.json())
      .then(json => this.setState({ data: json }));

    fetch(`http://localhost:3001/messages`)
      .then(res => res.json())
      .then(json => this.setState({ data3: json }));

    fetch(`http://localhost:3001/enrollments`)
      .then(res => res.json())
      .then(res => { this.setState({ data2: res })

      var arrayOfArrays = [];

      var ops = res.map((item,i) => { return (
         item.users_id == this.props.user_no ?
         item.requests_id : null
       )}
        )

      var op = res.map(function(item) {
        return item.requests_id, item.users_id;
      });
      this.setState({
        enr_check: ops
      })

      Object.keys(res).forEach(function(k){
        arrayOfArrays.push(res[k]);
      });
      this.setState({
        result: groupBy(arrayOfArrays, (c) => c.requests_id)
      })
      // this.state.result = groupBy(arrayOfArrays, (c) => c.requests_id);

        this.check_count = Object.keys(res).length;
        this.setState({
          check_req: arrayOfArrays
        })
        // this.state.check_req = arrayOfArrays
        this.checkWaiting()
      })
  }

  shouldComponentUpdate(nextStates) {
     const differentTitle = this.state.data2 !== nextStates.data2;
     return differentTitle
 }

  checkWaiting(){
    this.setState({ waiting: true})
  }

  renderMarkers() {
    var user_id = this.props.user_no
    var time_diff = new Date().getTime() - (40 * 24 *60 * 60 * 1000)

    return this.state.data.map((item,i) => { return (
       this.state.enr_check.indexOf(item.id) === -1 &&
       item.fulfilled === 0 && user_id !== item.owner_id && time_diff < new Date(item.rep_date).getTime() ?

       <Mymarker
       icon={item.typev === "1" ? blueIcon : greenIcon}
       key={item.id}
       title={item.title}
       typev={item.typev}
       description={item.description}
       created_at={time_diff}
       owner_id={item.owner_id}
       address={item.address}
       req_id={item.id}
       user_id={user_id}
       status={item.fulfilled}
       position={[item.location.split(',')[0],item.location.split(',')[1]]}
       onClick={this.onMarkerClick}
       /> : null
     )}
      )
  }

  render() {
    return (
      <div className ="center-col">
        <Container>
        <Row>
        <Col xs={12} md={6}>
        <Map
          center={position}
          zoom={10}>
          <TileLayer
            url='https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWluODgiLCJhIjoiY2tkMGhkcXVmMHRxdzJ0cXJucHZvc2tuciJ9.PgKhmGn1K8y9BEVK2JW-og'
            attribution='Map data © <a href="http://osm.org/copyright">OpenStreetMap</a> contributors. Tiles from <a href="https://www.mapbox.com">Mapbox</a>.'
          />
          {this.state.waiting === true && this.renderMarkers()}
        </Map>
        <h6><span role="img" aria-label="shine">✨</span> Stat <span role="img" aria-label="shine">✨</span></h6>
        </Col>

        <Col xs={12} md={6}>
        <Tabs defaultActiveKey="myVolunteer" transition={false} id="noanim-tab-example">
          <Tab eventKey="myVolunteer" title="My Volunteer">
            <Mypage user_no={this.props.user_no} renderMarkers={this.renderMarkers} data={this.state.data} data2={this.state.data2} data3={this.state.data3}/>
          </Tab>
          <Tab eventKey={'/myRequest'} title="My Request">
            <Myrequest user_no={this.props.user_no} data={this.state.data} data2={this.state.data2} data3={this.state.data3}/>
          </Tab>
          <Tab eventKey="request" title="Request Form">
            <Needvolunteer user_no={this.props.user_no} data={this.state.data} data2={this.state.data2} data3={this.state.data3}/>
          </Tab>
          <Tab eventKey="message" title="Message">
            <Mymessage user_no={this.props.user_no} data={this.state.data} data2={this.state.data2} data3={this.state.data3}/>
          </Tab>
        </Tabs>

        </Col>
        </Row><br />
        </Container>
        </div>

    )
  }
}

export default Tovolunteer;
