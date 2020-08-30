import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap'
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
      <Container>
      <Row>
      <Col md={4}>
        {mes_list.map((mes, index) => {
            return <p key={mes.id}>
              Message from Organizer: {mes.body}</p>
        })}
      </Col>

      <Col md={8}>
      dfdfd
      </Col>
      </Row>
      </Container>
    );
  }
}

export default Mymessage;
