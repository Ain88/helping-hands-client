import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Badge } from 'react-bootstrap'

function Mypage(props){
  const [vol_list, setVol_list] = useState({vol: [], req: []});

  const fetchData = async () => {
    const res = await axios(
      'http://localhost:3001/enrollments',
    );
    const res2 = await axios(
      `http://localhost:3001/requests`
    );

    setVol_list({vol: res.data, req: res2.data});
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderVolunteer = (volunteer) => {
    var mywork = volunteer;
    return vol_list.req.map((item,i) => { return (
       mywork === item.id ?
       <span key={item.id}>
       <h6 className="title">{item.title}&nbsp;&nbsp;
       <Badge variant="secondary">{item.typev === "1" ? 'One time': 'Material need'}</Badge>
       </h6>
       Duties: {item.description}
       </span>
     : null
     )}
      )
  }

  const submitCancel = (enrid, rid) => {
    console.log(rid)
    const enrollment = {
      requests_id: rid
    };

      axios.delete(`http://localhost:3001/enrollments/${enrid}`, {enrollment})
      .then(function (response){
        alert("Deleted");
        fetchData();
      }).catch(error=>console.log(error));
  }

    return (
      <div className="container content">

        <h6><b>My volunteer list</b></h6>
        <br /><hr /><br />

        {vol_list.vol.map((req, index) => {
            return <span key={req.id}>
              {req.users_id === props.user_no ? renderVolunteer(req.requests_id) : null}
              {req.users_id === props.user_no ?
                <span>&nbsp;&nbsp;<Button type="submit" variant="outline-info" size="sm"
                onClick={() =>
                  { if (window.confirm('Are you sure you wish to cancel to volunteer'))
                  submitCancel(req.id, req.requests_id) }} >
                  Cancel Volunteering</Button><br /><br /></span> : null}
            </span>
        })}
      </div>
    );
}

export default Mypage;
