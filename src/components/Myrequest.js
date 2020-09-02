import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Button } from 'react-bootstrap'

class Myrequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: props.user_no,
      req_list: []
    };
  }

  componentDidMount() {

  axios.get(`http://localhost:3001/requests`, {withCredentials: true})
    .then(res => {
      const req_list = res.data;
      this.setState({ req_list });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  submitRepublish(req){
    var req_id = req
    console.log(req_id)
    const updated = {
        updated_at: new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString()
    }
    axios.put(`http://localhost:3001/requests/${req}`, updated)
      .then(function (response) {
        alert("Your request has been added!");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { req_list, user_id } = this.state;
    var time_diff = new Date().getTime() - (60 * 60 * 1000)

    return (
      <div className="container content">
        <h6><b>My request list</b></h6>
        <br /><hr /><br />
        {req_list.map((req, index) => {
          if(req.owner_id == this.props.user_no){
            return <p key={req.id}>
              Title: {req.title}<br />
              {req.typev == 1 ? 'Type: One time help': 'Type: Material need'}<br />
              Description: {req.description}&nbsp;&nbsp;
              { time_diff > new Date(req.created_at).getTime() ?
                <Button type="submit" variant="info" size="sm"
                onClick={this.submitRepublish.bind(this, req.id)}>Republish</Button> : null }
            </p>
          } else {
          }
        })}
      </div>
    );
  }
}

export default Myrequest;
