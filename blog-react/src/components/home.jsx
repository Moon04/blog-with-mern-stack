import React, { Component } from 'react';

import Navbar from './navbar';
import AboutUs from './aboutUs';
import BlogForm from './blogForm';
// import Blog from './blog';
import Pagination from './pagination';

class Home extends Component {
    state = {  }
    render() { 
        console.log(this.props.authors);
        console.log(this.props.blogs);
        return ( 
            <React.Fragment>

                {/* Navbar ==> Loggedin <> Anonymous */}
                <Navbar currentUser={this.props.currentUser} />

                {/* Banner */}
                <div className="banner">
                    <img src="../images/banner.jpg" className="banner-img" alt="banner" />
                </div>

                {/* Home Container */}
                <div className="container-fluid">

                    <div className="row">

                        {this.props.currentUser !== null?
                            // Blog Form
                            <BlogForm
                                type="Add"
                                onBlogAdd={this.props.onBlogAdd}
                                onBlogUpdate={this.props.onBlogUpdate}
                            />:
                            // About Us
                            <AboutUs/>
                        }

                        {/* All Authors Blogs */}
                        <div className="col-md-8">
                        <div className="d-flex align-items-center my-5 flex-column">

                            {/* Blog Card */}   
                            {/* {this.props.blogs.map(blog => 
                                <Blog 
                                    key={blog.id} 
                                    blog={blog} 
                                    authors={this.props.authors} 
                                    currentUser={this.props.currentUser} 
                            />)} */}

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