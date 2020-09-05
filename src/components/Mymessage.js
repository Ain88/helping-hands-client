import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Container, Row, Col, Button, Tab, Nav, Form, Tabs } from 'react-bootstrap'
class Mymessage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user_id: props.user_no,
      mes_list: [],
      showing: false,
      body: '',
      errors: "",
      cur_id: '',
      check_rec: [],
    };
  }

  componentDidMount() {

    fetch(`http://localhost:3001/messages`)
      .then(res => res.json())
      .then(json => { this.setState({ mes_list: json });

    var arrayOfArrays = [];

    Object.keys(json).forEach(function(k){
      arrayOfArrays.push(json[k].sender);
    });

    this.setState({ check_rec: this.getUnique(arrayOfArrays, 'id') })
    console.log(this.state.check_rec);
    });
  }

  getUnique(array, key) {
    if (typeof key !== 'function') {
      const property = key;
      key = function(item) { return item[property]; };
    }
    return Array.from(array.reduce(function(map, item) {
      const k = key(item);
      if (!map.has(k)) map.set(k, item);
      return map;
    }, new Map()).values());
  }

  handleMessage = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };

  submitMessage(req_id, rec_id) {
    axios.post(`http://localhost:3001/messages`, {
          requests_id: req_id,
          body: this.state.body,
          sender_id: this.props.user_no,
          receiver_id: rec_id },
      {withCredentials: true})
      .then(function (response) {
        alert("Your message has been sent");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  showForm(req_id,rec_id,first,last,myshow){
    var f_name = first
    var l_name = last
    var receiver_id = rec_id
    var request_id = req_id
    var myshowing = myshow
    return (<Form>
    <p className="first-cap">Reply to {f_name}&nbsp;{l_name}
      <button type="button" className="close" aria-label="Close" onClick={() => this.setState({ showing: !myshowing})}>
          <span aria-hidden="true">&times;</span>
      </button>
    </p>
    <Form.Group className="messageForm">
      <Form.Control as="textarea" rows="3" name="body" value={this.state.body} onChange={this.handleMessage}/>
    </Form.Group>
    <Button type="submit" variant="info" size="sm" onClick={() => {this.submitMessage(request_id, receiver_id)}}>Send
    </Button>
    </Form>
    )
  }

  Sonnet(id, rid){
    return (
      this.state.mes_list.map(function(mes, i){
      if(mes.sender_id == id && mes.receiver_id == rid || mes.sender_id == rid && mes.receiver_id == id){
      return <ui className="chat" key={i}>
      {mes.sender_id == rid ? <li className="chat__bubble chat__bubble--sent"><b>Me</b><br/>{mes.body}</li> :
        <li className="chat__bubble chat__bubble--rcvd chat__bubble--stop"><b>{mes.sender.f_name} {mes.sender.l_name}</b><br />{mes.body}</li>
       }
       </ui>
      } else {
      }
    }
    )
    )
    return (<Form>
    </Form>
    )
  }

  render() {
    const { mes_list, user_id, showing, body, cur_id, check_rec } = this.state;
    return (
      <div className="container content">
      <h6><b>Click user name to view messages.</b></h6>

      <Tabs activeKey={this.state.check_rec.id}>
              {
              this.state.check_rec.map((rec) => {
                if(rec.id != this.props.user_no){
                   return <Tab key={rec.id} eventKey={rec.id}
                   title={rec.f_name + ' '+ rec.l_name}>
                   <br />{this.Sonnet(rec.id, this.props.user_no)}</Tab>
                }
                else {

                }
              })
              }
      </Tabs>

      </div>

    );
  }
}

export default Mymessage;
