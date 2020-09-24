import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Badge } from 'react-bootstrap'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'

function Myrequest(props){

  const [vol_list, setVol_list] = useState({req: [], enr: []});
  var time_diff = new Date().getTime() - (30 * 24 * 60 * 60 * 1000)

  const fetchData = async () => {
    const res = await axios(
      `http://localhost:3001/requests`
    );
    const res2 = await axios(
      `http://localhost:3001/enrollments`
    );
    setVol_list({req: res.data, enr: res2.data});
  };

  useEffect(() => {
    fetchData()
  }, []);

  const submitRepublish = (req) => {
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

    return (
      <div className="container content">
        <h6><b>My request list</b></h6>
        <br /><hr /><br />
        {vol_list.req.map((req, index) => {
        if(req.owner_id === props.user_no){
          return <span key={req.id}>
            <h6>{req.title}&nbsp;&nbsp;
            <Badge variant="secondary">{req.typev === "1" ? 'One time': 'Material need'}</Badge>
            </h6>
            Duties: {req.description}&nbsp;&nbsp;
            { time_diff > new Date(req.rep_date).getTime() && req.fulfilled === 0 ?
             <Button type="submit" variant="outline-info" size="sm"
             onClick={this.submitRepublish.bind(this, req.id)}>Republish</Button> : null }

            {vol_list.enr.map((enr, index) => {
            if(enr.requests_id === req.id){
              return <span key={enr.id}>
                {enr.user_id}&nbsp;&nbsp;
              </span>
            } else {
              return null;
            }
          })}
          </span>
        } else {
          return null;
        }
      })}

      </div>
    );
  }

export default Myrequest;
