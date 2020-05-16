import React from 'react';

const AuthorCard = props => {
    return ( 
        <React.Fragment>

            <li className="author-card d-flex">
                <img src={props.author.img} />
                <div className="ml-3">
                    <p>
                        <b>{props.author.username}</b>
                    </p>
                    <div><a href className="btn btn-card-follow">Follow</a></div>
                </div>
            </li>

        </React.Fragment>
     );
}
 
export default AuthorCard;