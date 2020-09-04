import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Tab, Nav, Form } from 'react-bootstrap'
class Mymessage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user_id: props.user_no,
      mes_list: [],
      showing: false,
      body: '',
      errors: "",
      cur_id: ''
    };
  }

  componentDidMount() {

  axios.get(`http://localhost:3001/messages`)
    .then(res => {
      const mes_list = res.data;
      this.setState({ mes_list });
    })
    .catch(function (error) {
      console.log(error);
    });
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

  render() {
    const { mes_list, user_id, showing, body, cur_id } = this.state;
    return (
      <div className="container content">
      <h6><b>Click to view messages.</b></h6>
      <Tab.Container id="left-tabs-vol">
        <Row>
          <Col sm={12}>
            <Nav variant="pills" className="flex-column">
              {mes_list.map((mes, index) => {
                  if(mes.receiver_id == this.props.user_no || mes.sender_id == this.props.user_no){
                  return <Nav.Item key={mes.id} className="navlink-custom" onClick={() => this.setState({ showing: false })}>
                  <Nav.Link eventKey={mes.id}>
                  <Container className="no-padding">
                  <Row className="no-margin">
                    <Col className="first-cap" xs={3}>{mes.sender.f_name}&nbsp;{mes.sender.l_name}</Col>
                    <Col xs={9}>{mes.requests.title}</Col>
                  </Row>
                  </Container>
                  </Nav.Link>
                  </Nav.Item>}
                  else {
                  }
              })}
            </Nav>
          </Col>
          <Col sm={12}><br />
            <Tab.Content>
            {mes_list.map((mes, index) => {
              if(mes.receiver_id == this.props.user_no){
              return <Tab.Pane key={index} eventKey={mes.id}>
              { showing
                  ? this.showForm(cur_id, mes.sender_id, mes.sender.f_name, mes.sender.l_name, this.state.showing)
                  : <div>Message from <span className="first-cap">{mes.sender.f_name}&nbsp;{mes.sender.l_name}</span> <br />
                    {mes.body}&nbsp;&nbsp;

                    <Button type="submit" variant="outline-info" size="sm"
                     onClick={() => this.setState({ showing: !showing, cur_id: mes.requests_id })}>Reply
                    </Button><hr /><br /></div>
              }
              </Tab.Pane>}
              else {
              }
            })}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      </div>

    );
  }
}

export default Mymessage;
