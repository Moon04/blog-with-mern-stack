import React from 'react';

import { Link } from 'react-router-dom';

const AuthorBanner = props => {
    return ( 
        <React.Fragment>
            <div className="banner">
                <img src="/images/banner.jpg" className="banner-img" alt="banner"/>
                <div className="profile-info">

                    {/* Author Avatar */}
                    <Link to="/authorprofile">
                        <img src={props.author.avatar} className="img-thumbnail info-img" alt="author avatar"/>
                    </Link>

                    {/* Author Name */}
                    <div className="info-body ml-3 py-5">
                        <Link to="/authorprofile">
                            {props.author.username}
                        </Link>
                        <h5>{props.author.fName} {props.author.lName}</h5>
                    </div>
                </div>
            </div>
        </React.Fragment>
     );
};
 
export default AuthorBanner;