import React from 'react';

class Mymarker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
    console.log(this.props.pos);
  }

  render() {
    return (
      <div><h3>{this.props.pos}</h3></div>
    );
  }
}

export default Mymarker;
