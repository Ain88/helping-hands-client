import React from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap'

class Myrequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: props.user_no,
      enr_list: [],
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

  onAddingItem = (i, ch) => (event) => {
  this.setState((state, props) => {
    state.req_list[i-1].check_mark = !state.req_list[i-1].check_mark;
    return {
      req_list: state.req_list
    }
    })
    var change = ''
    ch === 0 ? change = 1 : change = 0
    console.log(ch)
    console.log(change)
    const updated = {
        check_mark: change
    }

    axios.put(`http://localhost:3001/requests/${i}`, updated)
      .then(function (response) {
        setTimeout(() => {
          alert("Your request mark has been changed");
        }, 100)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  submitRepublish(req){
    var req_id = req
    console.log(req_id)
    const updated = {
        rep_date: new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString()
    }
    axios.put(`http://localhost:3001/requests/${req}`, updated)
      .then(function (response) {
        alert("Your request has been added!");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  redirect = () => {
    this.props.history.push('/')
  }

  render() {
    const { req_list } = this.state;
    var time_diff = new Date().getTime() - (30 * 24 * 60 * 60 * 1000)

    return (
      <div className="container content">
        <h6><b>My request list</b></h6>
        <br /><hr /><br />
        {req_list.map((req, index) => {
          if(req.owner_id === this.props.user_no){
            return <div key={req.id}>
              Title: {req.title}<br />
              {req.typev === 1 ? 'Type: One time help': 'Type: Material need'}<br />
              Description: {req.description}&nbsp;&nbsp;
              { time_diff > new Date(req.rep_date).getTime() && req_list.fulfilled === 0 ?
                <Button type="submit" variant="outline-info" size="sm"
                onClick={this.submitRepublish.bind(this, req.id)}>Republish</Button> : null }
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" checked={req.check_mark === 1 ? true : false} label="Check once fulfilled"
                  onChange={this.onAddingItem(req.id, req.check_mark)} />
                </Form.Group>
            </div>
          } else {
            return null;
          }
        })}
      </div>
    );
  }
}

export default Myrequest;
