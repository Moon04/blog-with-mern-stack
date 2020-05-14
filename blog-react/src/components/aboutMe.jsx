import React from 'react';

const AboutMe = props => {
    return ( 
        <React.Fragment>
                
            <div className="col-md-4">
                <div className="d-flex justify-content-center my-5 ml-3 sticky-top">
                    <div className="card about-card">
                    <div className="card-body">
                        <h5 className="card-title about-title">ABOUT ME</h5>
                        <p className="card-text blog-body">
                            {props.about}
                        </p>
                    </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    );
}
 
export default AboutMe;