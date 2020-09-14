import React from 'react';
import ActionCable from 'actioncable'

class Stat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }
  componentDidMount() {
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
    received: this.handleReceiveNewText
  })
  }

  componentWillUnmount() {
  }

  handleReceiveNewText = ({ text }) => {
  if (text !== this.state.text) {
    this.setState({ text })
  }
  }

  handleChange = e => {
    this.setState({ text: e.target.value })
    this.sub.send({ text: e.target.value, id: 1 })
  }

  render() {
    const { text } = this.state
    return (<div>
      <textarea value={String(this.state.text)} onChange={this.handleChange} />
      </div>
    )
  }
}

export default Stat;
