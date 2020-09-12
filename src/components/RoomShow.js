import React from 'react';
import RoomWebSocket from './RoomWebSocket'

class RoomShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getRoomData = (id) => {
    fetch(`http://localhost:3001/requests/${id}`)
    .then(response => response.json())
    .then(result => {
      this.setState({
        currentReq: {
          request: result.data,
          req_check: result.check_mark,
          req_count: result.counter
        }
      })
    })
  }

  updateAppStateRoom = (newRoom) => {
    this.setState({
      currentReq: {
        request: newRoom.request.data,
        req_check: newRoom.request.check_mark,
        req_count: newRoom.result.counter
      }
    })
  }


  render() {
    const { } = this.state
    return ( <div>
      <RoomWebSocket
        cableApp={this.props.cableApp}
        updateApp={this.props.updateApp}
        getRoomData={this.props.getRoomData}
      />
      </div>
    )
  }
}

export default RoomShow;
