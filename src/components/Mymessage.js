import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Tab, Nav, Form } from 'react-bootstrap'
class Mymessage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user_id: props.user_no,
      mes_list: [],
      showing: false
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

  showForm(first,last,id){
    var f_name = first
    var l_name = last
    var reciever_id = id
    return (<Form>
    <p>Reply to {f_name}&nbsp;{l_name}</p>
    <Form.Group controlId="exampleForm.ControlTextarea1">
      <Form.Control as="textarea" rows="3" />
    </Form.Group>
    <Button type="submit" variant="info" size="sm"
     >Send
    </Button>
    </Form>
    )
  }

  render() {
    const { mes_list, user_id, showing } = this.state;
    return (
      <div className="container content">
      <Tab.Container id="left-tabs-vol">
        <Row>
          <Col sm={4}>
            <Nav variant="pills" className="flex-column">
              {mes_list.map((mes, index) => {
                  if(mes.receiver_id == this.props.user_no){
                  return <Nav.Item key={mes.id} className="navlink-custom" onClick={() => this.setState({ showing: false })}>
                  <Nav.Link eventKey={mes.id}>
                  Sender: {mes.sender.f_name}&nbsp;{mes.sender.l_name}<br />
                  {mes.body.substring(0,20)+'...'} </Nav.Link>
                  </Nav.Item>}
                  else {
                  }
              })}
            </Nav>
          </Col>
          <Col sm={8}>
            <Tab.Content>
            {mes_list.map((mes, index) => {
              if(mes.receiver_id == this.props.user_no){
              return <Tab.Pane key={mes.id} eventKey={mes.id}>
              Message from {mes.sender.f_name}&nbsp;{mes.sender.l_name} <br />
              {mes.body}&nbsp;&nbsp;

              <Button type="submit" variant="outline-info" size="sm"
               onClick={() => this.setState({ showing: !showing })}>Reply
              </Button><hr /><br />
              { showing
                  ? this.showForm(mes.sender.f_name,mes.sender.l_name,mes.sender.id)
                  : null
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
