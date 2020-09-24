import React from 'react';
import axios from 'axios';
import ActionCable from 'actioncable'

class Stat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      req_list: [],
      text: "",
      mes: "",
      countComment: ""
    };
  }
  componentDidMount() {
    axios.get(`http://localhost:3001/requests`, {withCredentials: true})
      .then(res => {
        let commentCount = 0
        res.data.forEach(data => {
          commentCount += 1
        })
        this.setState({
          req_list: res.data,
          countComment: commentCount
        });
      })
      .catch(function (error) {
        console.log(error);
      });

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
      // this.send({ id: 1, text: new Date() });
      this.update()
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
      this.perform("away")
    },

  })
  }

  updateApp = (data) => {
    this.setState({
      text: data,
      mes: this.state.countComment
    })
  }

  componentWillUnmount() {
  }

  render() {
    return (<div>
      <h6>Total request: {this.state.countComment} (Fulfilled: {this.state.text}, Unfulfilled: {this.state.countComment-this.state.text} )</h6>
      </div>
    )
  }
}

export default Stat;
