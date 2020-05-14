import React from 'react';

const AuthorSubNav = props => {
    return ( 
        <React.Fragment>

                <form className="form-inline my-2 my-lg-0 mr-2 search-form">
                    <input className="form-control search-input" type="search" placeholder="Search Blogs" aria-label="Search" />
                    <button className="btn my-2 my-sm-0 search-btn" type="submit">
                        <i className="fas fa-search" />
                    </button>
                </form>
                <a href="#">
                    <img src="../images/avatar.jpg" className="profile-img" />
                </a>
                <ul className="profile-dropdown">
                    <li>
                    <a href="/myprofile">
                        <i className="fas fa-user mr-2" />
                        My Profile
                    </a>
                    </li>
                    <hr />
                    <li>
                    <a href="/">
                        <i className="fas fa-power-off mr-2" />
                        Log Out
                    </a>
                    </li>
                </ul>

        </React.Fragment>
     );
}
 
export default AuthorSubNav;