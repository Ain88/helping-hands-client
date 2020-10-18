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
    axios.get(`https://help-van.herokuapp.com/requests`, {withCredentials: true})
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

    window.fetch('https://help-van.herokuapp.com/notes/2', {headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }}).then(data => {
      data.json().then(res => {
        this.setState({ text: res.text })
    })
  })
  const cable = ActionCable.createConsumer('wss://help-van.herokuapp.com/cable')
  this.sub = cable.subscriptions.create('NotesChannel', {
    connected: function() {
      // this.send({ id: 1, text: new Date() });
      setTimeout(() => this.update(), 1000 );
      console.log('stat channel')
    },

    disconnected: function() {
      // Called when the subscription has been terminated by the server
      console.log('Notification Channel disconnected.');
    },

    received: (data) => {
       console.log(data)
       console.log('stat channel2')
       this.updateApp(data)
    },

    update() {
      console.log('stat channel3')
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
