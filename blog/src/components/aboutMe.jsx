import React, { Component } from 'react';

class AboutMe extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                
                <div className="col-md-4">
                    <div className="d-flex justify-content-center my-5 ml-3 sticky-top">
                        <div className="card about-card">
                        <div className="card-body">
                            <h5 className="card-title about-title">ABOUT ME</h5>
                            <p className="card-text blog-body">Some quick example text to build on the card title and make up the bulk of the card's content Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
         );
    }
}
 
export default AboutMe;