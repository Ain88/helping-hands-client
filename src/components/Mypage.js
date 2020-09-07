import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Form } from 'react-bootstrap'

class Mypage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: props.user_no,
      vol_list: [],
      data: []
    };
  }

  componentDidMount() {

  axios.get(`http://localhost:3001/enrollments`)
    .then(res => {
      const vol_list = res.data;
      this.setState({ vol_list });
    })
    .catch(function (error) {
      console.log(error);
    });

    fetch(`http://localhost:3001/requests`)
      .then(res => res.json())
      .then(json => this.setState({ data: json }))
      .catch(function (error) {
        console.log(error);
      });;
  }

  renderVolunteer(volunteer) {
    var mywork = volunteer;
    {return this.state.data.map((item,i) => { return (
       mywork == item.id ?
       <span key={item.id}>
       Title: {item.title}<br/>
       Type: {item.typev== 1 ? "One time help" : "Material help"}<br />
       Description: {item.description}
       <Form.Group controlId="formBasicCheckbox">
         <Form.Check type="checkbox" label="Check once fulfilled" />
       </Form.Group>
       </span>
     : null
     )}
      )}

  }

  render() {
    const { vol_list, user_id } = this.state;

    return (
      <div className="container content">

        <h6><b>My volunteer list</b></h6>
        <br /><hr /><br />
        {vol_list.map((req, index) => {
            return <div key={req.id}>
              {this.renderVolunteer(req.request_id)}<br />
            </div>
        })}
      </div>
    );
  }
}

export default Mypage;
