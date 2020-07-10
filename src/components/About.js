import React from "react"
import { Form, Row, Col, Button } from 'react-bootstrap';

class About extends React.Component {
  render() {
    return ( <div className= "container content">
        <h2 className= "center">About Us</h2><br />
        <div className= "text-md-left">
        <p>
        Helping Hands was established in 1972 and has had a proud history of serving clients in our
        community by assisting them to live independently, support them in their journey of aging,
        and to maintain and enhance their quality of life. As a multi-service, registered charitable
         organization, Helping Hands serves older adults and adults with physical disabilities residing
         in Orillia and surrounding townships of Severn, Oro-Medonte and Ramara, as well as Barrie
         and Muskoka. Our services have evolved over the years to meet the needs of our clients and
          to support our health care system. However, providing in-home care and caregiver support
          remains at the heart of Helping Hands.
        </p>
        <p>
        At every stage of life there are challenges and members of our community can rely on
        Helping Hands to not only assist with those challenges, but to create opportunities for
        community engagement, social interaction and enhance well-being. Whether that includes
        providing transportation services, assisting with meals, providing personal care or relief
        for a caregiver, housekeeping or a friendly visit, Helping Hands can provide the assistance
         one needs to maintain their independence while staying in their own home.
         </p>
         <p>
         Helping Hands maintains a unique service model by providing a wide range of home care and
         community support services for seniors and adults with a physical disability. These services
         are subsidized by government funding and utilize the generosity of volunteers. By relying
         on volunteers, Helping Hands is able to keep its costs as affordable as possible.
         </p>
        </div>
    </div>
    );
  }
}

export default About;
