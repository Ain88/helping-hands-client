import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import Img1 from '../img/bg1.jpg'
import Img2 from '../img/bg2.jpg'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render () {
    return (
    <div>
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Img1}
          alt="First Slide"
        />
      <Carousel.Caption>
      <h2>Helping Hands in Vancity</h2>
      <h5>Helping Hands partners with individuals or<br />families and with groups, schools and companies</h5>
      </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}
}
export default Home;
