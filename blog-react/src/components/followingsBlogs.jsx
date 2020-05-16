import React from 'react';
import Navbar from './navbar';

const FollowingsBlogs = props => {
    return ( 
        <React.Fragment>

            {/* Navbar */}
            <Navbar/>

           {/* Banner */}
           <div className="banner">
                <img src="../images/banner.jpg" className="banner-img" />
            </div>

            {/* Home Container */}
            <div className="container-fluid">

                <div className="row">

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
 
export default FollowingsBlogs;