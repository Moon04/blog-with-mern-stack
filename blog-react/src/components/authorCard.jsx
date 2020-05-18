import React from 'react';
import { Link } from 'react-router-dom';

const AuthorCard = props => {
    return ( 
        <React.Fragment>

            <li className="author-card d-flex">
                <img src={props.author.avatar} alt="author avatar" />
                <div className="ml-3">
                    <p>
                        <b><Link to={"/authorprofile/"+props.author.id}>{props.author.username}</Link></b>
                    </p>
                    <div><button type="button" className="btn btn-card-follow">Follow</button></div>
                </div>
            </li>

        </React.Fragment>
     );
}
 
export default AuthorCard;