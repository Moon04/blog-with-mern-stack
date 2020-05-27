import React from 'react';
import { Link } from 'react-router-dom';

const AuthorBanner = props => {

    let profileLink = "#";

    if(props.currentAuthor?._id === props.author?._id) profileLink = "/myprofile";
    
    else profileLink = "/authorprofile/"+props.author?._id;
    
    return ( 
        <React.Fragment>
            <div className="banner">
                <img src="/images/banner.jpg" className="banner-img" alt="banner"/>
                <div className="profile-info">

                    {/* Author Avatar */}
                    <Link to={profileLink}>
                        <img src={props.author?.avatar} className="img-thumbnail info-img" alt="author avatar"/>
                    </Link>

                    {/* Author Name */}
                    <div className="info-body ml-3 pt-3">
                        <Link to={profileLink}>
                            {props.author?.username}
                        </Link>
                        <h5>{props.author?.firstName} {props.author?.lastName}</h5>
                    </div>
                </div>
            </div>
        </React.Fragment>
     );
};
 
export default AuthorBanner;