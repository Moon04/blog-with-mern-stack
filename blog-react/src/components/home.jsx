import React, { Component } from 'react';

import Navbar from './navbar';
import AboutUs from './aboutUs';
import Pagination from './pagination';
import Blog from './blog';
import BlogForm from './blogForm';

class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>

                {/* Navbar ==> Loggedin <> Anonymous */}
                <Navbar currentUser={this.props.currentUser} />

                {/* Banner */}
                <div className="banner">
                    <img src="../images/banner.jpg" className="banner-img" />
                </div>

                {/* Home Container */}
                <div className="container-fluid">

                    <div className="row">

                        {this.props.currentUser !== null?
                            // Blog Form
                            <BlogForm/>:
                            // About Us
                            <AboutUs/>
                        }

                        {/* All Authors Blogs */}
                        <div className="col-md-8">
                        <div className="d-flex align-items-center my-5 flex-column">

                            {/* Blog Card */}   
                            {this.props.blogs.map(blog => <Blog key={blog.id} blog={blog} />)}

                        </div>
                        </div>
                    
                    </div>

                    {/* pagination */}
                    <Pagination/>

                </div>
            </React.Fragment>
         );
    }
}
 
export default Home;