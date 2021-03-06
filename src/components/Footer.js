import React from "react"

class Footer extends React.Component {
  render () {
    return (
      <div className="footer-area">
              {
                <div className="container">
                <footer className="page-footer">

                <div className="container-fluid text-center text-md-left">

                  <div className="row">

                    <div className="col-md-6 mt-md-0 mt-3">

                      <h5>Helping Hands in Vancity</h5>
                      <p>Helping Hands is first and foremost about community.
                      We are a community that believes in the power of volunteering to enrich
                      our lives and the world around us.</p>

                    </div>
                    <hr className="clearfix w-100 d-md-none pb-3" />

                    <div className="col-md-3 mb-md-0 mb-3">

                      <h5>Contact Us</h5>
                      <p>Cell: 240-555-6231<br />
                      Email: info@helpingvancity.com</p>
                    </div>

                    <div className="col-md-3 mb-md-0 mb-3">
                      <h5>Location</h5>
                      <p>220 Mart street<br />
                      Vancouver, BC, Canada</p>
                    </div>

                  </div>

                </div>
                <hr className="color-grey"/>
                <div className="footer-copyright text-center py-3">Copyright © 2020 by
                  <a className="copyright" href="https://ain88.github.io/portfolio"> Helping Hands in Vancity</a>
                </div>
                </footer></div>
              }
          </div>
    );
  }
}

export default Footer
