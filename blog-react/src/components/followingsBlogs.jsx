import React, { Component } from 'react';
import axios from 'axios';

import Navbar from './navbar';
import Blog from './blog';
import Pagination from './pagination';
import { getFromStorage } from '../utilities/storage';

class FollowingsBlogs extends Component {

    state={
        token: '',
        currentAuthor: {},
        blogs: [],
        activePage: 1,
        blogsMetadata: null,
        follow: true
    };

    async componentDidMount(){
        const token = getFromStorage('user_token');
        if (token) {
            this.setState({token});

           try {
            const {data: currentAuthor} = await axios.get("http://localhost:3000/user/info", 
            { headers: {"Authorization" : `${token}`} });

            this.setState({currentAuthor: currentAuthor.data[0]});
            
            this.getFollowingBlogs();
           } catch (error) {
            this.props.history.replace('/notfound');
           }
        }
        else{
            this.props.history.replace('/notfound');
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.state.activePage !== prevState.activePage) {
          this.getFollowingBlogs(); 
        }
        else  if (this.state.follow !== prevState.follow) {
            this.getFollowingBlogs(); 
          }
      }

    //get followings blogs from backend
    getFollowingBlogs = async () =>{
        const {data: blogs} = await axios.get(`http://localhost:3000/post/followingsposts?pageNumber=${this.state.activePage-1}`, 
        { headers: {"Authorization" : `${this.state.token}`} });
        this.setState({blogs: blogs.data});
        this.setState({blogsMetadata: blogs.metadata});
    };

    //handle follow btn
    handleFollowBtn = author=>{
    this.setState({follow: !this.state.follow});
    this.props.handleFollowBtn(author);
    };
   
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
                                    handleFollowBtn={this.handleFollowBtn}
                                />)
                            }

                            {
                                this.state.blogs.length===0 &&
                                <div className="no-followings">
                                    No Followings Blogs!<br/>
                                    Follow Other Authors To See Their Blogs Here
                                </div>
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