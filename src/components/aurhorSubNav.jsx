import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { getFromStorage } from '../utilities/storage';
import { removeFromStorage } from './../utilities/storage';

class AuthorSubNav extends Component {

    state = {
        openDropdown: "none",
        author: {},
        searchTerm: ''
        };
    
    async componentDidMount(){
        const token = getFromStorage('user_token');
        if (token) {
            try {
                const {data} = await axios.get(process.env.REACT_APP_BACKEND_URL+"/user/info", 
                { headers: {"Authorization" : `${token}`} });

                this.setState({author: data.data[0]})
            } catch (error) {
                this.props.history.replace('/notfound');
            }
        }
    }

    handleChange = ({ target }) => {
        //Set Satate
        this.setState({ searchTerm: target.value });
      };

    handleSearchInput = e=>{
        e.preventDefault();
        this.props.handleSearchInput(this.state.searchTerm)
    }

    handleLogoutBtn = () =>{
        removeFromStorage('user_token');
    }

    //open author profile dropdown function
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
                    <form className="form-inline my-2 my-lg-0 mr-2 search-form" onSubmit={this.handleSearchInput}>
                        <input className="form-control search-input" type="search" id="searchTerm" 
                            name="searchTerm" placeholder="Search Blogs" 
                            title="Search by blog title!"
                            onChange={this.handleChange}
                        />
                        <button className="btn my-2 my-sm-0 search-btn" type="submit">
                            <i className="fas fa-search" />
                        </button>
                    </form>

                    {/* Author Avatar */}
                    <Link to="#" onClick={this.openDropdown}>
                        <img src={this.state.author.avatar} className="profile-img" alt="profile-avatar"/>
                    </Link>
                    
                    {/* Author Profile Dropdown */}
                    <ul className="profile-dropdown" style={{display: this.state.openDropdown}}>
                        <li>
                            <Link to="/myprofile">
                                <i className="fas fa-user mr-2" />
                                My Profile
                            </Link>
                        </li>
                        <hr />
                        <li>
                            <Link to="/signIn" onClick={this.handleLogoutBtn}>
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