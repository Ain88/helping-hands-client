import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

class Mypage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: props.user_no,
      vol_list: []
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
  }

  render() {
    const { vol_list, user_id } = this.state;

    return (
      <div className="container content">

        <h6>My volunteer list</h6>
        <br /><hr /><br />
        {vol_list.map((req, index) => {
            return <p key={req.id}>
              Type: One time help<br />
            </p>
        })}
      </div>
    );
  }
}

export default Mypage;
