import React from 'react';
import { Link } from 'react-router-dom';

const AuthorInfo = props => {
    return ( 
        <React.Fragment>
                
            <section className="author-profile">
                <div className="row profile-details">
                    <div className="col-md-4 details-link">
                    <button type="button" className="btn-details">Profile Details</button>
                    </div>
                    <div className="col-md-4 df-jc">
                    <ul className="blogs-menu">
                        <li>Blogs <b>50</b></li>
                        <li><Link to="/followers" >Followers <b>100</b></Link></li>
                        <li><Link to="/followings">Following <b>70</b></Link></li>
                    </ul>
                    </div>
                    {props.author.id !== props.currentUser.id && 
                        <div className="col-md-4 btn-follow-dstart">
                            <button type="button" className="btn-follow">Follow</button>
                        </div>
                    }
                </div>
            </section>

        </React.Fragment>
     );
}
 
export default AuthorInfo;