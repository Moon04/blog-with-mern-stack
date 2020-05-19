import React, { Component } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";

import Navbar from './navbar';
import AboutUs from './aboutUs';
import BlogForm from './blogForm';
import Blog from './blog';
import Pagination from './pagination';

class Home extends Component {

    state={
        formType: null
      };
    
      //handle blog form type -add/edit- function
      handleFormType = (type) =>{
        if(type === "Add") this.setState({formType: "Add"});
        else if(type !== null) this.setState({formType: type});
        else this.setState({formType: "null"});
      };
    
      //clode blog form modal
      closeForm = () =>{
        this.setState({formType: null});
      };

      //handle blog delete
      handleBlogDelete = async blog => {
          //Copy Orignal Data
          const orignalData = [...this.props.blogs];
      
          //State
          this.props.onBlogDelete(blog);
      
          try {
            //Call BackEnd
            const { data } = await axios.delete(
              `http://localhost:3000/blogs/${blog.id}`
            );
            console.log(data);
          } catch (error) {
            //Print Error
            if (error.response && error.response.status === 404) {
              toast("Blog already Deleted");
            } else {
              toast("Something went wrong!");
            }
            //Restore Data
            this.props.onRestoreBlogs(orignalData);
          }
        };

    render(){
        return ( 
            <React.Fragment>

                {/* Navbar ==> Loggedin / Anonymous */}
                <Navbar 
                    currentUser={this.props.currentUser} 
                />

                {/* Banner */}
                <div className="banner">
                    <img src="/images/banner.jpg" className="banner-img" alt="Banner"/>
                </div>

                {/* Home Container */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4">

                            {/* Blog Form */}
                            {this.props.currentUser !== null?
                                <BlogForm
                                    formType="Add"
                                    modal={false}
                                    currentUser={this.props.currentUser}
                                    onBlogAdd={this.props.onBlogAdd}
                                    onBlogUpdate={this.props.onBlogUpdate}
                                    onBlogDelete={this.handleBlogDelete}
                                    onRestoreBlogs={this.props.onRestoreBlogs}
                                />:
                                // About Us
                                <AboutUs/>
                            }
                        </div>

                        {/* All Authors Blogs */}
                        <div className="col-md-8">
                            <div className="d-flex align-items-center my-5 flex-column">

                                {/* Blog Card */}   
                                {this.props.blogs.map(blog => 
                                    <Blog 
                                        key={blog.id} 
                                        authors={this.props.authors} 
                                        blog={blog} 
                                        currentUser={this.props.currentUser} 
                                        onBlogDelete={this.handleBlogDelete}
                                        handleFormType={this.handleFormType}
                                        handleFollowBtn={this.props.handleFollowBtn}
                                    />)
                                }
                            </div>
                        </div>
                    </div>

                    {/* Blog Modal For Blog Edit */}
                    <div 
                      tabIndex="-1" 
                      role="dialog"
                      style={{display: this.state.formType? "flex": "none", justifyContent: "center"}}
                      className={this.state.formType? "modal blog-form-modal":"modal fade"} 
                    >
                        {this.state.formType && 
                          <BlogForm
                            formType={this.state.formType}
                            modal={true}
                            closeForm={this.closeForm}
                            currentUser={this.props.currentUser}
                            onBlogUpdate={this.props.onBlogUpdate}
                            onRestoreBlogs={this.props.onRestoreBlogs}
                          />
                        }
                      </div>

                    {/* pagination */}
                    <Pagination/>

                </div>
            </React.Fragment>
        );
    }
}
 
export default Home;