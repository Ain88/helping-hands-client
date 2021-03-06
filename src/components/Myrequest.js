import React from 'react';
import axios from 'axios';
import { Button, Badge, Card } from 'react-bootstrap'

class Myrequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }

  submitRepublish = (req) => {
    var req_id = req
    console.log(req_id)
    const updated = {
        rep_date: new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString()
    }
    axios.put(`https://help-van.herokuapp.com/requests/${req}`, updated)
      .then(function (response) {
        alert("Your request has been added!");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  submitReqDelete = (id) => {
    axios.delete(`https://help-van.herokuapp.com/requests/${id}`)
    .then(res => {
      alert("Selected request has been deleted!");
    })
  }

  submitDelete = (enr, rid, usrid, title) => {
      const enrollment = {
        requests_id: rid
      };

      const message = {
        body: 'Hi, owner of [' + title + '] has cancelled your volunteer request',
        requests_id: rid,
        sender_id: localStorage.usersid,
        receiver_id: usrid
      }

      axios.all([
        axios.delete(`https://help-van.herokuapp.com/enrollments/${enr}`, {enrollment}, {withCredentials: true}),
        axios.post(`https://help-van.herokuapp.com/messages`, { message }, {withCredentials: true})
      ])
      .then(axios.spread((data2) => {
          alert("Selected enrollment has been deleted!");
          console.log('data2', data2);
          this.redirect()
      })).catch(error=>console.log(error));
  }

  render() {
    return (
      <div className="custom-content">
      <div className="custom-overflow">
        <h6><b>My request list</b></h6>
        <br /><hr /><br />
        {this.props.data.map((req, index) => {
        var time_diff = new Date().getTime() - (4 * 24 * 60 * 60 * 1000)
        if(req.owner_id == localStorage.usersid){
          return <div key={req.id}>
            <h6 className="title">{req.title}&nbsp;&nbsp;
            <Badge variant="secondary">{req.typev === "1" ? 'One time': 'Material need'}</Badge>&nbsp;
            { (time_diff > new Date(req.rep_date).getTime()) && (req.cur_counter <  req.counter) ?
             <Button className="button-pad" type="submit" variant="outline-info" size="sm"
             onClick={this.submitRepublish.bind(this, req.id)}>Republish</Button> :
             <Button className="button-pad" type="submit" variant="outline-info" size="sm" disabled>Republish</Button>
             }
            </h6>
            Duties: {req.description}&nbsp;&nbsp;
             <br /><div className="space"></div>
             <Card>
              <Card.Body className="title space">List of Volunteers ({req.cur_counter}/{req.counter})</Card.Body>
              {this.props.data2.map((enr, index) => {
              if(enr.requests_id === req.id){
                return <span key={enr.id}>
                  <Card.Body>{enr.users.f_name}&nbsp;{enr.users.l_name}&nbsp;({enr.users.email})&nbsp;
                  <button type="submit" className="close" aria-label="Close"
                  onClick={() =>
                    { if (window.confirm('Are you sure you wish to remove this volunteer?'))
                    this.submitDelete(enr.id, enr.requests_id, enr.users_id, enr.requests.title) }}>
                    <span>&times;</span>
                  </button>&nbsp;
                  </Card.Body>
                </span>
              } else {
                return null;
              }
              })}

            </Card>
          <div><br /><br /></div></div>
        } else {
          return null;
        }
      })}
      </div>
      </div>
    );
  }}

export default Myrequest;
