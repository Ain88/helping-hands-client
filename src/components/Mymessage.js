import React from 'react';
import axios from 'axios';
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
      <div className="container content">
        {mes_list.map((mes, index) => {
            return <p key={mes.id}>
              Message: {mes.body}<br /></p>
        })}
      </div>
    );
  }
}

export default Mymessage;
