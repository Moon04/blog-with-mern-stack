import React, { Component } from 'react';

class AuthorBanner extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                
                <div className="banner">
                    <img src="../images/banner.jpg" className="banner-img" />
                    <div className="profile-info">
                        <a href="author-profile.html">
                        <img src="../images/avatar.jpg" className="img-thumbnail info-img" />
                        </a>
                        <div className="info-body ml-3 py-5">
                        <a href="author-profile.html">
                            Avatar Aang
                        </a>
                        <h5>Avatar Aang</h5>
                        </div>
                    </div>
                </div>

            </React.Fragment>
         );
    }
}
 
export default AuthorBanner;