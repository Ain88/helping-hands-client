import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Badge } from 'react-bootstrap'
import ActionCable from 'actioncable'

class Mypage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }

  renderVolunteer = (volunteer) => {
    var mywork = volunteer;
    return this.props.data.map((item,i) => { return (
       mywork === item.id ?
       <span key={item.id}>
       <h6 className="title">{item.title}&nbsp;&nbsp;
       <Badge variant="secondary">{item.typev === "1" ? 'One time': 'Material need'}</Badge>
       </h6>
       Duties: {item.description}
       </span>
     : null
     )}
      )
  }

  submitCancel = (enrid, rid) => {
    console.log(rid)
    const enrollment = {
      requests_id: rid
    };

      axios.delete(`http://localhost:3001/enrollments/${enrid}`, {enrollment})
      .then(function (response){
        alert("Deleted");
        this.props.renderMarkers();
      }).catch(error=>console.log(error));
  }

  render() {
    return (
      <div className="container content">
        <h6><b>My volunteer list</b></h6>
        <br /><hr /><br />

        {this.props.data2.map((req, index) => {
            return <span key={req.id}>
              {req.users_id === this.props.user_no ? this.renderVolunteer(req.requests_id) : null}
              {req.users_id === this.props.user_no ?
                <span>&nbsp;&nbsp;<Button type="submit" variant="outline-info" size="sm"
                onClick={() =>
                  { if (window.confirm('Are you sure you wish to cancel to volunteer'))
                  this.submitCancel(req.id, req.requests_id) }} >
                  Cancel Volunteering</Button><br /><br /></span> : null}
            </span>
        })}
      </div>
    );
}}

export default Mypage;
