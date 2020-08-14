import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

class Mymarker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3001/requests`)
      .then(res => res.json())
      .then(json => this.setState({ data: json }));
  }

  render() {
    const {data} = this.state
    return (
      <div>
        {data.map(item => (
         <Marker
           key={item.id}
           title={item.title}
           description={item.description}
           position={[49.2827, -123.1207 ]}
           onClick={this.onMarkerClick}
         />
        ))}
      </div>
    );
  }
}

export default Mymarker;
