import React from 'react';
import axios from 'axios';
import ActionCable from 'actioncable'

class Stat2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      req_channel: []
    };
  }
  componentDidMount() {
    window.fetch('http://localhost:3001/enrollments', {headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }}).then(data => {
      data.json().then(res => {
        this.setState({ req_channel: res })
    })
  })
  const cable = ActionCable.createConsumer('ws://localhost:3001/cable')
  this.sub = cable.subscriptions.create('EnrollmentsChannel', {
    connected: function() {
      // this.send({ id: 1, text: new Date() });
      setTimeout(() => this.update(), 1000 );
    },

    disconnected: function() {
      // Called when the subscription has been terminated by the server
      console.log('Notification Channel disconnected.');
    },

    received: (data) => {
       console.log(data)
       this.updateApp(data)
    },

    update() {
      console.log("just chekcing")
      this.perform("away2")
    },

  })
}

updateApp = (data) => {
  console.log("update start")
  console.log(data)
  this.setState({
    req_chnnnel: data
  })
}


  componentWillUnmount() {
  }

  render() {
    return (
      <div>
      {this.state.req_channel.map((req,index)=>
      <span key={req.id}>
      {req.requests.title}</span>)}</div>
    )
  }
}

export default Stat2;
