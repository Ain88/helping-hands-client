import React from 'react';
import axios from 'axios';
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

  onAddingItem = (i, ch) => (event) => {
  this.setState((state, props) => {
    state.vol_list[i-1].check_mark = !state.vol_list[i-1].check_mark;
    return {
      vol_list: state.vol_list
    }
    })
    var change = ''
    ch === 0 ? change = 1 : change = 0
    console.log(ch)
    console.log(change)
    const updated = {
        check_mark: change
    }

    axios.put(`http://localhost:3001/enrollments/${i}`, updated)
      .then(function (response) {
        setTimeout(() => {
          alert("Your fulfillment status has been changed");
        }, 100)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  renderVolunteer(volunteer) {
    var mywork = volunteer;
    return this.state.data.map((item,i) => { return (
       mywork === item.id ?
       <span key={item.id}>
       Title: {item.title}<br/>
       Type: {item.typev=== 1 ? "One time help" : "Material help"}<br />
       Description: {item.description}
       </span>
     : null
     )}
      )

  }

  render() {
    const { vol_list } = this.state;

    return (
      <div className="container content">

        <h6><b>My volunteer list</b></h6>
        <br /><hr /><br />
        {vol_list.map((req, index) => {
            return <span key={req.id}>
              {req.user_id === this.props.user_no ? this.renderVolunteer(req.requests_id) : null}
              {req.user_id === this.props.user_no ? <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" checked={req.check_mark === 1 ? true : false}
                label="Check once fulfilled"
                onChange={this.onAddingItem(req.id, req.check_mark)} /></Form.Group> : null}
            </span>
        })}
      </div>
    );
  }
}

export default Mypage;
