import React from 'react';
import axios from 'axios';
import * as moment from 'moment';
import { Button, Tab, Form, Tabs } from 'react-bootstrap'
class Mymessage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mes_list: [],
      enr_list: [],
      cur_user: '',
      showing: false,
      body: '',
      cur_id: '',
      send_id: '',
      rec_id: '',
      check_rec: [],
      check_rec2: [],
      check_rec3: [],
      cur_sender: '',
      errors: ''
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

    fetch(`http://localhost:3001/enrollments`)
      .then(res => res.json())
      .then(json => { this.setState({ enr_list: json }); })

  }

  fetchNext(cur_userr){
    fetch(`http://localhost:3001/messages`)
      .then(res => res.json())
      .then(json => { this.setState({ mes_list: json });

    var arrayOfArrays = [];
    var arrayOfArrays2 = [];

    Object.keys(json).forEach(function(k){
      if(json[k].receiver_id === cur_userr){
      arrayOfArrays.push(json[k].sender);
    } else if (json[k].sender_id === cur_userr){
      arrayOfArrays.push(json[k].receiver);
    }
      else{}
    })

    Object.keys(json).forEach(function(k){
      if(json[k].receiver_id === cur_userr || json[k].sender_id === cur_userr){
      arrayOfArrays2.push(json[k]);
    }else{}
    })

    this.setState({ check_rec: this.getUnique(arrayOfArrays, 'id') })
    this.setState({ check_rec2: this.getUnique(arrayOfArrays2, 'requests_id') })
    console.log("checkchkeck");
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

  handleMessage2 = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
    this.functionTwo(value)
  };

  functionTwo(name) {
    var myvalue = name;
    return this.state.check_rec2.map((check,i) => { return (
       myvalue === check.id ? this.setState({ rec_id : check.owner_id }) : null
     )}
      )
  }

  handleSubmit = event => {
  event.preventDefault();

  axios.post(`http://localhost:3001/messages`, {
      requests_id: this.state.send_id,
      body: this.state.body,
      sender_id: this.props.user_no,
      receiver_id: this.state.cur_sender })
    .then(res => {
      if (res.data.status === 'created') {
        console.log(res.data);
        alert("Your message has been sent!");
        this.redirect()
      } else {
        this.setState({
          errors: res.data.errors
        })
      }
    })
    .catch(error => console.log('api errors:', error))
  }
  redirect = () => {
    this.props.history.push('/')
  }
  handleErrors = () => {
    return (
      <div>
        <ul>{this.state.errors.map((error) => {
          return <li key={error}>{error}</li>
        })}</ul>
      </div>
    )
  }

  handleSelect = (key) => {
    this.setState({
      cur_sender: key
    })
  }

  Sonnet(id, rid, showing, cur_id){
    return (
      this.state.mes_list.map(function(mes, i){
      if((mes.sender_id === id && mes.receiver_id === rid) || (mes.sender_id === rid && mes.receiver_id === id)){
      return <span className="chat" key={i}>
      {mes.sender_id === rid ?
        <div className="chat__bubble chat__bubble--rcvd chat__bubble--stop clearfix"><b>Me</b><br/>
        <span className="font-08">[{mes.requests.title}]</span><br/>{mes.body}<br/>
        <span className="font-08">Sent at {moment(mes.created_at).format('MMMM Do YYYY, h:mm:ss a')}</span></div> :
        <div className="chat__bubble chat__bubble--rcvd chat__bubble--stop clearfix">
        <div><b>{mes.sender.f_name} {mes.sender.l_name}</b><br/>
        <span className="font-08">[{mes.requests.title}]</span><br />{mes.body}<br/>
        <span className="font-08">Sent at {moment(mes.created_at).format('MMMM Do YYYY, h:mm:ss a')}</span></div>
        </div>
      }
       <hr/></span>
      } else {
        return null
      }
    }))
  }

  render() {
    const { send_id } = this.state;
    return (
      <div className="container content">
      <h6><b>Click user name to view messages.</b></h6>

      <Tabs defaultActiveKey="" activeKey={this.state.check_rec.id} onSelect={this.handleSelect}>
              {
              this.state.check_rec.map((rec) => {
                if(rec.id !== this.props.user_no){
                   return <Tab key={rec.id} eventKey={rec.id}
                   title={<span>{rec.f_name + ' '+ rec.l_name} <i className="far fa-comment"></i> </span>}>
                   <br /><div>{this.Sonnet(rec.id, this.props.user_no, this.state.showing, this.state.cur_id)}</div>
                   <div>

                   <Form className="chat" onSubmit={this.handleSubmit}>
                       <Form.Group className="exampleForm.ControlSelect">
                       <hr />
                         <Form.Control className="chat" as="select" name="send_id" value={send_id} onChange={this.handleMessage2} custom>
                           <option className="chat" key={0}>Choose a message topic</option>
                           {this.state.check_rec2.map((check, i) => {
                             if(check.sender_id === rec.id || check.receiver_id === rec.id){
                              return (<option key={i+1} value={check.requests_id} onChange={this.handleMessage2}>{check.requests.title}</option>
                            )}
                            return null;
                          })}
                         </Form.Control>
                       </Form.Group>
                       <Form.Group className="messageForm">
                         <Form.Control className="chat" as="textarea" rows="3" name="body" value={this.state.body} onChange={this.handleMessage} />
                       </Form.Group>
                       <Button className="chat-right" type="submit" variant="info" size="sm">Send
                       </Button>
                    </Form>

                  </div>
                 <div><br />
                    {
                      this.state.errors ? this.handleErrors() : null
                    }
                  </div>
                   </Tab>
                }
                else {
                  return null;
                }
              })
              }
      </Tabs>
      </div>

    );
  }
}

export default Mymessage;
