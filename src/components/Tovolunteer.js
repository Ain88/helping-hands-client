// import React from "react"
// import { Nav, Navbar } from 'react-bootstrap'
//
// class Tovolunteer extends React.Component {
//   render () {
//     return (
//       <div className="container content center">
//         <h1>Tovolunteer</h1>
//          <div id="mapid"></div>
//       </div>
//     );
//   }
// }
//
// export default Tovolunteer;

import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';

const defaultLatLng: LatLngTuple = [48.865572, 2.283523];
const zoom:number = 8;

const Tovolunteer:React.FC = () => {
   return (
     <div className="container content center">
       <h1>To volunteer</h1><br />

     <Map id="mapId"
           center={defaultLatLng}
           zoom={zoom}>
       <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors">
       </TileLayer>
    </Map>

    </div>
   )
}

export default Tovolunteer;
