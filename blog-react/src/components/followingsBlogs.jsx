import React from 'react';

import Navbar from './navbar';
import Blog from './blog';
import Pagination from './pagination';

const FollowingsBlogs = props => {

    let blogs = [];

    console.log(props.currentUser);

    let followingsIds = props.currentUser.followings;

    props.blogs.forEach(blog => {
        followingsIds.forEach(id => {
            if (blog.authorId === id) {
                blogs.push(blog);
            }
        });
    });

    return ( 
        <React.Fragment>

            {/* Navbar */}
            <Navbar 
                currentUser={props.currentUser} 
            />

           {/* Banner */}
           <div className="banner">
                <img src="../images/banner.jpg" className="banner-img" alt="banner"/>
            </div>

            {/* Home Container */}
            <div className="container-fluid">
                <div className="justify-content-center d-flex">

                    {/* All Authors Blogs */}
                        <div className="d-flex align-items-center my-5 flex-column">

                            {/* Blog Card */}   
                            {blogs.map(blog => 
                                <Blog 
                                    key={blog.id} 
                                    blog={blog} 
                                    authors={props.authors} 
                                    currentUser={props.currentUser} 
                                    handleFollowBtn={props.handleFollowBtn}
                                />)
                            }
                        </div>
                </div>

                {/* pagination */}
                <Pagination/>
                
            </div>
        </React.Fragment>
     );
};
 
export default FollowingsBlogs;