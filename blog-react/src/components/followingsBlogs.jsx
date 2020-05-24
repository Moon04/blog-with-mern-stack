import React, { Component } from 'react';
import axios from 'axios';

import { getFromStorage } from '../utilities/storage';

import Navbar from './navbar';
import Blog from './blog';
import Pagination from './pagination';

class FollowingsBlogs extends Component {

    state={
        currentAuthor: {},
        blogs: [],
        activePage: 1,
        blogsMetadata: null
    };

    getFollowingBlogs = async () =>{
        const {data: blogs} = await axios.get(`http://localhost:3000/post/followingsposts?pageNumber=${this.state.activePage-1}`, 
            { headers: {"Authorization" : `${this.state.token}`} });
            this.setState({blogs: blogs.data});
            this.setState({blogsMetadata: blogs.metadata});
    }

    async componentDidMount(){
        const token = getFromStorage('user_token');
        if (token) {
            
            const {data: currentAuthor} = await axios.get("http://localhost:3000/user/info", 
            { headers: {"Authorization" : `${token}`} });

            this.setState({currentAuthor: currentAuthor.data[0]})
            
            this.getFollowingBlogs();
            
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.state.activePage !== prevState.activePage) {
          this.getFollowingBlogs(); 
        }
      }
  

    //pagination
    handlePageChange = page=>{
        this.setState({activePage: page});
      };

    render(){
        
        return ( 
            <React.Fragment>

                {/* Navbar */}
                <Navbar/>

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
                                {this.state.blogs?.map(blog => 
                                    <Blog 
                                        key={blog._id}
                                        from="followingsblogs"
                                        blog={blog} 
                                        currentAuthor={this.state.currentAuthor} 
                                        handleFollowBtn={this.props.handleFollowBtn}
                                    />)
                                }
                            </div>
                    </div>

                    {/* pagination */}
                    {
                        this.state.activePage>1 &&
                        <Pagination
                        activePage={this.state.activePage}
                        pagesCount={this.state.blogsMetadata.pages}
                        onPageChange={this.handlePageChange}
                        />
                    }
                    
                </div>
            </React.Fragment>
        );
    }
}
 
export default FollowingsBlogs;