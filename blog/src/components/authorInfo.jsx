import React, { Component } from 'react';

class AuthorInfo extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                
                <section className="author-profile">
                    <div className="row profile-details">
                        <div className="col-md-4 details-link">
                        <a href="#" className="btn-details" role="button">Profile Details</a>
                        </div>
                        <div className="col-md-4 df-jc">
                        <ul className="blogs-menu">
                            <li>Blogs <b>50</b></li>
                            <li>Followers <b>100</b></li>
                            <li>Following <b>70</b></li>
                        </ul>
                        </div>
                        <div className="col-md-4 btn-follow-dstart">
                        <a href="#" className="btn-follow">Follow</a>
                        </div>
                    </div>
                </section>

            </React.Fragment>
         );
    }
}
 
export default AuthorInfo;