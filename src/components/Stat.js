import React from 'react';

class Stat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total_default: '',
      total_request: '',
      total_progress: '',
      total_finished: '',
      total_need: ''
    };
  }
  componentDidMount() {
    fetch(`http://localhost:3001/requests`)
      .then(res => res.json())
      .then(json => this.setState({ data: json }));

    fetch(`http://localhost:3001/enrollments`)
      .then(res => res.json())
      .then(json => this.setState({ data2: json }));

    this.interval = setInterval(() =>
      this.setState({
      total_request: this.checkRequest(), total_finished: this.checkMessage() }), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  checkRequest(){
    var total_default = 0
    var total_active = 0
    var total_cur = 0
    var time_diff = new Date().getTime() - (7 * 24 * 60 * 60 * 1000)

    {this.state.data.map((cou,i) => {
      if (time_diff < new Date(cou.rep_date).getTime()) {
        return total_default += cou.counter, total_active += cou.counter,total_cur += cou.cur_counter
      } else {
        return total_default += cou.counter, total_active, total_cur
      }
      return total_default += cou.counter, total_active += cou.counter,total_cur += cou.cur_counter
      }
    )}
    return <span>Total defulat enrollments: {total_default}<br />
            Total active enrollments: {total_active}<br />
            Total enrollments in progress: {total_cur}</span>
  }

  checkMessage(){
    var time_diff = new Date().getTime() - (7 * 24 * 60 * 60 * 1000)
    var total_finished = 0
    {this.state.data2.map((cou,i) => {
      if ((cou.check_mark == 1 && cou.finished >= 2) || cou.requests.check_mark == 1) {
        return total_finished += 1
      } else {
        return total_finished
      }
      return total_finished += 1
      }
    )}
    return <span>Total fulfilled enrollments: {total_finished}</span>
  }

  render() {
    const { total_default, total_request, total_progress, total_finished, total_need } = this.state
    return ( <div>
      <h6>{total_request}</h6>
      <h6>{total_finished}</h6>
      </div>
    )
  }
}

export default Stat;
