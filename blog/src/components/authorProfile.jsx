import React, { Component } from 'react';
import Navbar from './navbar';
import AuthorBanner from './authorBanner';
import AuthorInfo from './authorInfo';
import Pagination from './pagination';
import AboutMe from './aboutMe';
import Blog from './blog';

class AuthorProfile extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                
                {/* Navbar */}
                <Navbar/>

                {/* Author Banner */}
                <AuthorBanner/>

                {/* Author Info ==> Author<>Mine */}
                <AuthorInfo/>

                {/* Profile Container */}
                <div className="container-fluid">
                    <div className="row mx-5">

                        {/* About Me */}
                        <AboutMe/>

                        {/* Author Blogs */}
                        <div className="col-md-8">
                            <div className="d-flex align-items-center my-5 flex-column">

                                {/* Blog Card */}
                                <Blog/>

                            </div>
                        </div>

                        {/* pagination */}
                        <Pagination/>

                    </div>
                </div>


            </React.Fragment>
         );
    }
}
 
export default AuthorProfile;