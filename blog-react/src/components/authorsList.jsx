import React from 'react';

import Navbar from './navbar';
import AuthorCard from './authorCard';

const AuthorsList = props => {

    let authorsIds = [];
    let authors = [];

    if(props.listType === "followings" ) authorsIds = props.currentUser.followings;
    
    else if(props.listType === "followers") authorsIds = props.currentUser.followers;
    
    props.authors.forEach(author => {
        authorsIds.forEach(id => {
            if(author.id === id) authors.push(author);
        });
    });

    return ( 
        <React.Fragment>
                
                {/* Navbar */}
                <Navbar 
                    currentUser={props.currentUser} 
                />

               {/* Authors List Container */}
                <div className="container-fluid">
                    <section className="py-5">
                        <div className="authors-list">

                            {/* List Title */}
                            <div className="list-title">
                                {props.listType === "followrs"?
                                    "Followers":
                                    "Followings"
                                }
                            </div>

                            {/* List Body */}
                            <ul className="list-body pl-0">
                                {authors.map(author => 
                                    <AuthorCard 
                                        currentUser={props.currentUser}
                                        author={author}
                                        handleFollowBtn={props.handleFollowBtn}
                                    />)
                                }
                            </ul>
                        </div>
                    </section>
                </div>
            </React.Fragment>
     );
};

export default AuthorsList;