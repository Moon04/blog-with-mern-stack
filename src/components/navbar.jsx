import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import AuthorSubNav from './aurhorSubNav';
import AnonymousSubNav from './anonymousSubNav';
import { getFromStorage } from '../utilities/storage';

class Navbar extends Component {

    state={
        token: ''
    };
    
    componentDidMount(){
        const token = getFromStorage('user_token');
        if (token) this.setState({token});
    }

    render(){
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
                                {this.state.token && 
                                    // Followings' Blogs Link
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/followingsblogs">
                                            Followings' Blogs
                                        </NavLink>
                                    </li>
                                }
                            </ul>

                            {/* SubNav */}
                            { this.state.token? 
                                // Author SubNav
                                <AuthorSubNav
                                    handleSearchInput={this.props.handleSearchInput}
                                /> : 
                                // Anonymous User SubNav
                                <AnonymousSubNav/>
                            }
                        
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}
export default Navbar;