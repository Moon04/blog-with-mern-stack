import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import AuthorSubNav from './aurhorSubNav';
import AnonymousSubNav from './anonymousSubNav';

const Navbar = props => {
    
    return ( 
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    {/* website logo */}
                    <Link className="navbar-brand" to="/">
                        <img src="/images/logo.png" width={30} height={30} className="d-inline-block align-top" alt="logo" />
                    </Link>
                    {/* toggle btn */}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            {/* Home Page Link */}
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            {props.currentUser && 
                                // Followings' Blogs Link
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/followingsblogs">
                                        Followings' Blogs
                                    </NavLink>
                                </li>
                            }
                        </ul>

                        {/* SubNav */}
                        {props.currentUser !== null? 
                            // Author SubNav
                            <AuthorSubNav currentUser={props.currentUser}/> : 
                            // Anonymous User SubNav
                            <AnonymousSubNav/>
                        }
                    
                    </div>
                </div>
            </nav>
        </React.Fragment>
    );
};
 
export default Navbar;