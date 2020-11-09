import React, { Component } from 'react';
import './App.scss';
import axios from 'axios'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import Tovolunteer from './components/Tovolunteer'
import Needvolunteer from './components/Needvolunteer'
import Mypage from './components/Mypage'
import Mymarker from './components/Mymarker'
import Myrequest from './components/Myrequest'
import Mymessage from './components/Mymessage'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './components/registrations/Login'
import Signup from './components/registrations/Signup'
import Stat from './components/Stat'
import ActionCable from 'actioncable'
import { Container, Row, Col } from 'react-bootstrap'
import L from "leaflet";

function groupBy(xs, f) {
  return xs.reduce((r, v, i, a, k = f(v)) => (((r[k] || (r[k] = [])).push(v), r)), {})
}

var greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      f_name: "",
      l_name: "",
      user: {},
      user_id : "",
      stat: "",
      req_list: [],
      req: "",
      marker_data: [],
      data: [],
      data2: [],
      data3: [],
      check_count: '',
      waiting: false,
      check_req: [],
      result: [],
      total_count: '',
      enr_check: '',
      req_channel: []
     };
  }

//'http://localhost:3001'
//'https://help-van.herokuapp.com'
//'ws://localhost:3001/cable'
//'wss://help-van.herokuapp.com/cable'

  UNSAFE_componentWillMount() {
      this.loginStatus()
    }

  componentDidMount(){
    this.loginStatus();

    axios.get(`https://help-van.herokuapp.com/requests`, {withCredentials: true})
      .then(res => {
        const req_list = res.data;
        this.setState({ req_list });
      })
      .catch(function (error) {
        console.log(error);
      });
      fetch(`https://help-van.herokuapp.com/requests`)
        .then(res => res.json())
        .then(json => this.setState({ data: json }));

      fetch(`https://help-van.herokuapp.com/messages`)
        .then(res => res.json())
        .then(json => this.setState({ data3: json }));

      window.fetch(`https://help-van.herokuapp.com/enrollments`, {headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }}).then(data => { data.json()
        .then(res => { this.setState({ data2: res })

        var arrayOfArrays = [];

        var ops = res.map((item,i) => { return (
           item.users_id === localStorage.usersid ?
           item.requests_id : null
         )}
          )

        this.setState({
          enr_check: ops
        })

        Object.keys(res).forEach(function(k){
          arrayOfArrays.push(res[k]);
        });
        this.setState({
          result: groupBy(arrayOfArrays, (c) => c.requests_id)
        })
        // this.state.result = groupBy(arrayOfArrays, (c) => c.requests_id);

          this.check_count = Object.keys(res).length;
          this.setState({
            check_req: arrayOfArrays
          })
          // this.state.check_req = arrayOfArrays
          this.checkWaiting()
        })
      })

    const cable = ActionCable.createConsumer(`wss://help-van.herokuapp.com/cable`)
    this.sub = cable.subscriptions.create('EnrollmentsChannel', {
      connected: function() {
        // this.send({ id: 1, text: new Date() });
        setTimeout(() => this.update(), 1000 );
      },

      disconnected: function() {
        // Called when the subscription has been terminated by the server
        this.connected()
      },

      received: (data2) => {
         this.updateApp(data2)
      },

      update() {
        this.perform("away2")
      },

    })

  }

  loginStatus = () => {
      axios.get(`https://help-van.herokuapp.com/logged_in`, {withCredentials: true})
      .then(response => {
        if (response.data.logged_in) {
          this.setState({
            user_id: response.data.user.id,
            f_name: response.data.user.f_name,
            l_name: response.data.user.l_name
          })
          this.handleLogin(response)
        } else {

        }
      })
      .catch(error => console.log('api errors:', error))
    }
  handleLogin = (response) => {
      this.setState({
        isLoggedIn: true,
        user: response.user
      })
      localStorage.setItem('rememberMe', true);
      localStorage.setItem('usersid', response.user.id);
      this.props.history.push('/mypage');
    }
  handleLogout = () => {
      console.log("logging out")
      localStorage.removeItem('rememberMe');
      localStorage.setItem('rememberMe', false);
      localStorage.removeItem('usersid');
      this.setState({
      isLoggedIn: false,
      user: {}
      })
    }
  redirect = () => {
  }

  updateApp = (data2) => {
    fetch(`https://help-van.herokuapp.com/requests`)
      .then(res => res.json())
      .then(json => this.setState({ data: json }));

    fetch(`https://help-van.herokuapp.com/enrollments`)
      .then(res => res.json())
      .then(json => { this.setState({ data2: json });
      var arrayOfArrays = [];

      var ops = json.map((item,i) => { return (
         item.users_id === localStorage.usersid ?
         item.requests_id : null
       )}
        )

      this.setState({
        enr_check: ops
      })

      Object.keys(json).forEach(function(k){
        arrayOfArrays.push(json[k]);
      });
      this.setState({
        result: groupBy(arrayOfArrays, (c) => c.requests_id)
      })
      // this.state.result = groupBy(arrayOfArrays, (c) => c.requests_id);
        this.check_count = Object.keys(json).length;
        this.setState({
          check_req: arrayOfArrays
        })
        // this.state.check_req = arrayOfArrays
        this.checkWaiting()
      });
    this.renderMarkers();
  }

  checkWaiting(){
    this.setState({ waiting: true})
  }

  renderMarkers() {
    var user_id = localStorage.usersid
    var time_diff = new Date().getTime() - (40 * 24 *60 * 60 * 1000)

    return this.state.data.map((item,i) => { return (
       this.state.enr_check.indexOf(item.id) === -1 &&
       item.fulfilled === null && user_id !== item.owner_id && time_diff < new Date(item.rep_date).getTime() ?

       <Mymarker
       icon={item.typev === "1" ? blueIcon : greenIcon}
       key={item.id}
       title={item.title}
       typev={item.typev}
       description={item.description}
       created_at={time_diff}
       owner_id={item.owner_id}
       address={item.address}
       req_id={item.id}
       user_id={user_id}
       status={item.fulfilled}
       position={[item.location.split(',')[0],item.location.split(',')[1]]}
       onClick={this.onMarkerClick}
       /> : null
     )}
      )
  }

  render() {
      return (
        <div>
        <BrowserRouter>
        <Route
          render={props => (
          <Header {...props}
          user_no={this.state.user_id} f_name={this.state.f_name} l_name={this.state.l_name} loggedInStatus={this.state.isLoggedIn} handleLogout={this.handleLogout}/>
        )} />
        <div className ="center-col">
          <Container>
          <Row>
          <Col xs={12} md={6}>
          <Tovolunteer user_no={this.state.user_id}/>
          <br /><br />
          </Col>

          <Col xs={12} md={6} className="custom-height">

              <Route
                exact path='/'
                render={props => (
                  localStorage.rememberMe === 'true' ? (
                <Mypage {...props}
                data={this.state.data} data2={this.state.data2} data3={this.state.data3} user_no={this.state.user_id} />
              ): (
                <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
              )
                )}
              />
              <Route
              exact path='/Stat'
              render={props => (
                <Stat {...props}
                stat={this.state.stat} user_no={this.state.user_id} req={this.state.req_list.count}/>
               )}
              />
              <Route
                exact path='/Needvolunteer'
                render={props => (
                <Needvolunteer {...props}
                user_no={this.state.user_id} loggedInStatus={this.state.isLoggedIn}/>
                )}
              />
              <Route
              exact path='/Tovolunteer'
                render={props => (
                  localStorage.rememberMe === 'true' ? (
                <Tovolunteer {...props} user_no={this.state.user_id} />
              ): (
                window.confirm('Logging out'),
                <Redirect to={{ pathname: '/login', state: 'Please sign in first'}} {...props}
                handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
              )
                )}
              />

              <Route
                exact path='/mypage'
                render={props => (
                <Mypage {...props}
                data={this.state.data} data2={this.state.data2} data3={this.state.data3} user_no={this.state.user_id} />
                )}
              />
              <Route
                exact path='/myrequest'
                render={props => (
                <Myrequest {...props}
                data={this.state.data} data2={this.state.data2} data3={this.state.data3} user_no={this.state.user_id} />
                )}
              />
              <Route
                exact path='/mymessage'
                render={props => (
                <Mymessage {...props} user_no={this.state.user_id} loggedInStatus={this.state.isLoggedIn} />
                )}
              />
              <Route
                exact path='/mymarker'
                render={props => (
                <Mymarker {...props} user_no={this.state.user_id} />
                )}
              />
              <Route
              exact path='/login'
                render={props => (
                  localStorage.rememberMe === 'true' ? (
                <Mypage {...props} data={this.state.data} data2={this.state.data2} data3={this.state.data3} user_no={this.state.user_id} />
              ): (
                <Login {...props}
                user_no={this.state.user_id} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
              )
                )}
              />
               <Route
               exact path='/signup'
                 render={props => (
                   localStorage.rememberMe === 'true' ? (
                 <Mypage {...props}
                 data={this.state.data} data2={this.state.data2} data3={this.state.data3} user_no={this.state.user_id} />
               ): (
                 <Signup {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
               )
                 )}
               />

          </Col>
          </Row><br />
          </Container>
          </div>

          <Footer />
        </BrowserRouter>

        </div>
      );
    }
}
export default App;
