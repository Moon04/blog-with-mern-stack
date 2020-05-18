import React from 'react';
import Navbar from './navbar';
import AuthorCard from './authorCard';

const AuthorsList = props => {
    return ( 
        <React.Fragment>
                
                {/* Navbar */}
                <Navbar/>

               {/* Authors List Container */}
                <div className="container-fluid">
                    <section className="py-5">
                        <div className="authors-list">

                        {/* List Title */}
                        <div className="list-title">
                            Followers
                        </div>

                        {/* List Body */}
                        <ul className="list-body pl-0">
                            {props.authors.map(author => <AuthorCard author={author}/>)}
                        </ul>
                        </div>
                    </section>
                </div>

            </React.Fragment>
     );
}

export default AuthorsList;