import React from 'react';
import L from "leaflet";
import Mymarker from './Mymarker'
import Stat from './Stat'
import { Map, TileLayer } from 'react-leaflet';
import ActionCable from 'actioncable'

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

    fetch(`https://help-van.herokuapp.com/requests`)
      .then(res => res.json())
      .then(json => this.setState({ data: json }));

    fetch(this.props.dev_server+`/requests`)
      .then(res => res.json())
      .then(json => this.setState({ data3: json }));

    window.fetch(`https://help-van.herokuapp.com/enrollments`, {headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }}).then(data => { data.json()
      .then(res => { this.setState({ data2: res })

      var arrayOfArrays = [];

      var ops = res.map((item,i) => { return (
         item.users_id === localStorage.usersid ?
         item.requests_id : null
       )}
        )

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
    })

  const cable = ActionCable.createConsumer(`wss://help-van.herokuapp.com/cable`)
  this.sub = cable.subscriptions.create('EnrollmentsChannel', {
    connected: function() {
      // this.send({ id: 1, text: new Date() });
      setTimeout(() => this.update(), 1000 );
    },

    disconnected: function() {
      // Called when the subscription has been terminated by the server
      this.connected()
    },

    received: (data2) => {
       this.updateApp(data2)
    },

    update() {
      this.perform("away2")
    },

  })
}

  updateApp = (data2) => {
    fetch(`https://help-van.herokuapp.com/requests`)
      .then(res => res.json())
      .then(json => this.setState({ data: json }));

    fetch(`https://help-van.herokuapp.com/enrollments`)
      .then(res => res.json())
      .then(json => { this.setState({ data2: json });
      var arrayOfArrays = [];

      var ops = json.map((item,i) => { return (
         item.users_id === localStorage.usersid ?
         item.requests_id : null
       )}
        )

      this.setState({
        enr_check: ops
      })

      Object.keys(json).forEach(function(k){
        arrayOfArrays.push(json[k]);
      });
      this.setState({
        result: groupBy(arrayOfArrays, (c) => c.requests_id)
      })
      // this.state.result = groupBy(arrayOfArrays, (c) => c.requests_id);
        this.check_count = Object.keys(json).length;
        this.setState({
          check_req: arrayOfArrays
        })
        // this.state.check_req = arrayOfArrays
        this.checkWaiting()
      });
    this.renderMarkers();
  }

  checkWaiting(){
    this.setState({ waiting: true})
  }

  renderMarkers() {
    var user_id = localStorage.usersid
    var time_diff = new Date().getTime() - (4 * 24 *60 * 60 * 1000)

    return this.state.data.map((item,i) => { return (
       this.state.enr_check.indexOf(item.id) === -1 &&
       item.counter > item.cur_counter && localStorage.usersid !== item.owner_id && time_diff < new Date(item.rep_date).getTime() ?

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
      <div>
        <Map
          center={position}
          zoom={10}>
          <TileLayer
            url='https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWluODgiLCJhIjoiY2tkMGhkcXVmMHRxdzJ0cXJucHZvc2tuciJ9.PgKhmGn1K8y9BEVK2JW-og'
            attribution='Map data © <a href="http://osm.org/copyright">OpenStreetMap</a> contributors. Tiles from <a href="https://www.mapbox.com">Mapbox</a>.'
          />
          {this.state.waiting === true && this.renderMarkers()}
        </Map>
        <Stat />

        </div>

    )
  }
}

export default Tovolunteer;
