import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import * as moment from 'moment';
import { Container, Row, Col, Button, Tab, Nav, Form, Tabs } from 'react-bootstrap'
class Mymessage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mes_list: [],
      cur_user: '',
      showing: false,
      body: '',
      errors: "",
      cur_id: '',
      check_rec: [],
      check_rec2: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3001/logged_in', {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.setState({
          cur_user: response.data.user.id
        })
        this.fetchNext(this.state.cur_user)
      } else {
      }
    })
    .catch(error => console.log('api errors:', error))

  }

  fetchNext(cur_userr){
    fetch(`http://localhost:3001/messages`)
      .then(res => res.json())
      .then(json => { this.setState({ mes_list: json });

    var arrayOfArrays = [];
    var arrayOfArrays2 = [];

    Object.keys(json).forEach(function(k){
      if(json[k].receiver_id == cur_userr){
      arrayOfArrays.push(json[k].sender);
    }else{}
    })

    Object.keys(json).forEach(function(k){
      if(json[k].receiver_id == cur_userr){
      arrayOfArrays2.push(json[k].requests);
    }else{}
    })

    this.setState({ check_rec: this.getUnique(arrayOfArrays, 'id') })
    this.setState({ check_rec2: this.getUnique(arrayOfArrays2, 'id') })
    console.log(this.state.check_rec);
    console.log(this.state.check_rec2);
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

  Sonnet(id, rid, showing, cur_id){
    return (
      this.state.mes_list.map(function(mes, i){
      if(mes.sender_id == id && mes.receiver_id == rid || mes.sender_id == rid && mes.receiver_id == id){
      return <span className="chat" key={i}>
      {mes.sender_id == rid ?
        <div className="chat__bubble chat__bubble--sent"><b>Me</b><br/>{mes.body}<br/>
        <span className="font-08">Sent at {moment(mes.created_at).format('MMMM Do YYYY, h:mm:ss a')}</span></div> :
        <div className="chat__bubble chat__bubble--rcvd chat__bubble--stop clearfix">
        <div><b>{mes.sender.f_name} {mes.sender.l_name}</b><br />{mes.body}<br/>
        <span className="font-08">Sent at {moment(mes.created_at).format('MMMM Do YYYY, h:mm:ss a')}</span></div>
        </div>
      }
       <hr/></span>
      } else {
      }
    }))
  }

  Sonnet2(id, rid, showing, cur_id){
      return (<Form className="chat">
          <Form.Group controlId="exampleForm.ControlSelect">
          <hr />
            <Form.Control className="chat" as="select" custom>
              <option className="chat" key={0}>Choose a message topic</option>
              {this.state.check_rec2.map((check, i) =>
                <option key={i+1}>{check.title}</option>
              )}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control className="chat" as="textarea" rows="3" />
          </Form.Group>
        </Form>)
  }

  render() {
    const { mes_list, user_id, showing, body, cur_id, check_rec, check_rec2 } = this.state;
    return (
      <div className="container content">
      <h6><b>Click user name to view messages.</b></h6>

      <Tabs activeKey={this.state.check_rec.id}>
              {
              this.state.check_rec.map((rec) => {
                if(rec.id != this.props.user_no){
                   return <Tab key={rec.id} eventKey={rec.id}
                   title={<span>{rec.f_name + ' '+ rec.l_name} <i className="far fa-comment" /> </span>}>
                   <br /><div>{this.Sonnet(rec.id, this.props.user_no, this.state.showing, this.state.cur_id)}</div>
                   <div>{this.Sonnet2(rec.id, this.props.user_no, this.state.showing, this.state.cur_id)}</div>
                   </Tab>
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
