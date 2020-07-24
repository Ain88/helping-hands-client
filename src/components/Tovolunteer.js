import React from "react";
import L from "leaflet";
import Locate from "leaflet.locatecontrol";
import { render } from 'react-dom'

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

class Tovolunteer extends React.Component {

componentDidMount() {
  var map = new L.Map('map', {
      layers: [mapbox],
      center: [49.2827, -123.1207],
      zoom: 15,
      zoomControl: true
  });
  var lc = L.control.locate({
    strings: {
        title: "Show me where I am, yo!"
    },
    initialZoomLevel: 13
}).addTo(map);
L.marker([49.2827, -123.1208]).addTo(map);
L.marker([49.2827, -123.130]).addTo(map);
}

render() {
    return (
    <div className="container content center">
      <h1>Volunteer Today!</h1><br />
        <div id="map" style={mapStyle} />
    </div>
    )
  }
}

export default Tovolunteer;
