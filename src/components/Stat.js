import React from 'react';
import axios from 'axios';
import ActionCable from 'actioncable'

class Stat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      req_list: [],
      text: "",
      mes: ""
    };
  }
  componentDidMount() {
  //   axios.get(`http://localhost:3001/requests`, {withCredentials: true})
  //     .then(res => {
  //       const req_list = res.data;
  //       this.setState({ req_list });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //
    window.fetch('http://localhost:3001/notes/1', {headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }}).then(data => {
      data.json().then(res => {
        this.setState({ text: res.text })
    })
  })
  const cable = ActionCable.createConsumer('ws://localhost:3001/cable')
  this.sub = cable.subscriptions.create('NotesChannel', {
    connected: function() {
      this.send({ id: 1, text: new Date() });
    },

    disconnected: function() {
      // Called when the subscription has been terminated by the server
      console.log('Notification Channel disconnected.');
    },

    received: function(data) {
       console.log('received!')
       console.log(data);
    }
  })
  }

  handleReceiveNewText (text) {
    if (text !== this.state.text) {
      this.setState({ text })
    }
  }

  componentWillUnmount() {
  }

  render() {
    const { text, req_list, mes } = this.state
    return (<div>
      <h1>{this.state.text}</h1>
      <h1>{this.state.mes}</h1>
      </div>
    )
  }
}

export default Stat;
