import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

class Mypage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      owner_id: ""
    };
  }

    componentDidMount(){

    var user_id = this.props.user_no
    console.log(user_id)

    axios.get('http://localhost:3001/requests', {withCredentials: true})
    .then(response => {
        this.setState({
        });
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  render() {
    return (
      <div className="container content">

        <h6>My volunteer list</h6>
        <p></p>
        <br /><hr /><br />
        <h6>My request list</h6>
        <br />
      </div>
    );
  }
}

export default Mypage;
