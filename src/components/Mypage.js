import React from 'react';
import axios from 'axios';
import { Button, Badge } from 'react-bootstrap'

class Mypage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      data2: []
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

      axios.delete(`https://help-van.herokuapp.com/enrollments/${enrid}`, {enrollment})
      .then(function (response){
        alert("Deleted");
      }).catch(error=>console.log(error));
  }

  render() {
    return (
      <div className="custom-content">
      <div className="custom-overflow">
        <h6><b>My volunteer list</b></h6>
        <br /><hr /><br />

        {this.props.data2.map((req, index) => {
            return <span key={req.id}>
              {req.users_id == localStorage.usersid ? this.renderVolunteer(req.requests_id) : null}
              {req.users_id == localStorage.usersid ?
                <span>&nbsp;&nbsp;<Button type="submit" variant="outline-info" size="sm"
                onClick={() =>
                  { if (window.confirm('Are you sure you wish to cancel to volunteer'))
                  this.submitCancel(req.id, req.requests_id) }} >
                  Cancel Volunteering</Button><br /><br /></span> : null}
            </span>
        })}
      </div>
      </div>
    );
}}

export default Mypage;
