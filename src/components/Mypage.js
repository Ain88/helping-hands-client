import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

class Mypage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: props.user_no,
      req_list: []
    };
  }

  componentDidMount() {

  axios.get(`http://localhost:3001/requests`)
    .then(res => {
      const req_list = res.data;
      this.setState({ req_list });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { req_list, user_id } = this.state;

    return (
      <div className="container content">

        <h6>My volunteer list</h6>
        <br /><hr /><br />
        <h6>My request list</h6>
        <br />
        {req_list.map((req, index) => {
          if(req.typev == 1 && req.owner_id == this.props.user_no){
            return <p key={req.id}>
              Type: One time help<br />
              Title: {req.title}<br />
              Description: {req.description}<br />
            </p>
          } else if(req.typev == 2 && req.owner_id == this.props.user_no){
            return <p key={req.id}>
              Type: Material help<br />
              Title: {req.title}<br />
              Description: {req.description}<br />
            </p>
          } else {
          }
        })}
      </div>
    );
  }
}

export default Mypage;
