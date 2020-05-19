import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class AuthorSubNav extends Component {

    state = {
        openDropdown: "none"
    };

    openDropdown = () =>
    {
        this.state.openDropdown === "none"? 
            this.setState({ openDropdown: "block" })
            :this.setState({ openDropdown: "none" });
    };

    render(){
        return ( 
            <React.Fragment>

                    {/* Search Input */}
                    <form className="form-inline my-2 my-lg-0 mr-2 search-form">
                        <input className="form-control search-input" type="search" placeholder="Search Blogs" aria-label="Search" />
                        <button className="btn my-2 my-sm-0 search-btn" type="submit">
                            <i className="fas fa-search" />
                        </button>
                    </form>

                    {/* Author Avatar */}
                    <Link to="#" onClick={this.openDropdown}>
                        <img src={this.props.currentUser.avatar} className="profile-img" alt="profile-avatar"/>
                    </Link>
                    
                    {/* Author Dropdown */}
                    <ul className="profile-dropdown" style={{display: this.state.openDropdown}}>
                        <li>
                            <Link to="/myprofile">
                                <i className="fas fa-user mr-2" />
                                My Profile
                            </Link>
                        </li>
                        <hr />
                        <li>
                            <Link to="/signin">
                                <i className="fas fa-power-off mr-2" />
                                Log Out
                            </Link>
                        </li>
                    </ul>
            </React.Fragment>
        );
    }
}
 
export default AuthorSubNav;