import React from 'react';
import axios from 'axios'

class Mypage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: ""
    };
  }
  componentDidMount(){
    axios.get('http://localhost:3001/logged_in', {withCredentials: true})
    .then(response => {
          this.setState({
            user_id: response.data.logged_in
          });
    })
    .catch(function (error) {
      console.log(error);
    });
    console.log(this.props.loggedInStatus)

  }

  render() {
    const { user_id } = this.state;
    return (
      <div className="container content">
        <h3 className="center">My page</h3>
        <br />

        <h5>My volunteer list</h5>


        <br /><hr /><br />
        <h5>My request list</h5>
        <p>{this.state.user_id}</p>
        <br />
      </div>
    );
  }
}

export default Mypage;
