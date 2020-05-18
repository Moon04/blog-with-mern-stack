import React from 'react';

const AuthorBanner = props => {
    return ( 
        <React.Fragment>
                
            <div className="banner">
                <img src="/images/banner.jpg" className="banner-img" alt="banner" />
                <div className="profile-info">
                    <a href="authorprofile">
                    <img src={props.author.avatar} className="img-thumbnail info-img" alt="author avatar" />
                    </a>
                    <div className="info-body ml-3 py-5">
                    <a href="/authorprofile">
                        {props.author.username}
                    </a>
                    <h5>{props.author.fName}{props.author.lName}</h5>
                    </div>
                </div>
            </div>

        </React.Fragment>
     );
}
 
export default AuthorBanner;