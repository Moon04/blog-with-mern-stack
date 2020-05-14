import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import AuthorSubNav from './aurhorSubNav';
import AnonymousSubNav from './anonymousSubNav';

class Navbar extends Component {
    
    render() { 
        return ( 
            <React.Fragment>
                
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                            <img src="../images/logo.png" width={30} height={30} className="d-inline-block align-top" />
                        </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            {this.props.currentUser && 
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/followingsblogs">Followings' Blogs</NavLink>
                                </li>
                            }
                        </ul>

                        {/* SubNav */}
                        {this.props.currentUser !== null? 
                            // Author SubNav
                            <AuthorSubNav/> : 
                            // Anonymous User SubNav
                            <AnonymousSubNav/>}
                        
                        </div>
                    </div>
                </nav>

            </React.Fragment>
         );
    }
}
 
export default Navbar;