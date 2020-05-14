import React, { Component } from 'react';
import AuthorSubNav from './aurhorSubNav';
import AnonymousSubNav from './anonymousSubNav';

class Navbar extends Component {
    
    render() { 
        return ( 
            <React.Fragment>
                
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <a className="navbar-brand" href="index-anonymous.html">
                        <img src="../images/logo.png" width={30} height={30} className="d-inline-block align-top" />
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="index-anonymous.html">Home</a>
                            </li>
                            {this.props.currentUser && 
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Followings' Blogs</a>
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