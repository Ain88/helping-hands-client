import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Tab, ListGroup } from 'react-bootstrap'
class Mymessage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user_id: props.user_no,
      mes_list: []
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

  render() {
    const { mes_list, user_id } = this.state;
    return (
      <div className="container content">
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
      <Row>
        <Col sm={4}>
          <ListGroup>
            {mes_list.map((mes, index) => {
              return
              <div>
              <ListGroup.Item action href={`/posts/${mes.id}`}>
              Message from Organizer: {mes.body}
              </ListGroup.Item></div>
           })}
          </ListGroup>
        </Col>
        <Col sm={8}>
          <Tab.Content>

          </Tab.Content>
        </Col>
      </Row>
      </Tab.Container>
      </div>

    );
  }
}

export default Mymessage;
