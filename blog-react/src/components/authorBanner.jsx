import React from 'react';

const AuthorBanner = props => {
    return ( 
        <React.Fragment>
                
            <div className="banner">
                <img src="../images/banner.jpg" className="banner-img" />
                <div className="profile-info">
                    <a href="authorprofile">
                    <img src="../images/avatar.jpg" className="img-thumbnail info-img" />
                    </a>
                    <div className="info-body ml-3 py-5">
                    <a href="/authorprofile">
                        Avatar Aang
                    </a>
                    <h5>Avatar Aang</h5>
                    </div>
                </div>
            </div>

        </React.Fragment>
     );
}
 
export default AuthorBanner;