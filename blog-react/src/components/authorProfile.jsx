import React, { Component } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";

import Navbar from './navbar';
import AuthorBanner from './authorBanner';
import AuthorInfo from './authorInfo';
import Pagination from './pagination';
import AboutMe from './aboutMe';
import Blog from './blog';
import BlogForm from './blogForm';
import ProfileDetails from './profaileDetails';

class AuthorProfile extends Component {

  state={
    formType: null,
    detailsModalStatus: false
  };

  //handle blog form type -add/edit- function
  handleFormType = (type) =>{
    if(type === "Add") this.setState({formType: "Add"});
    else if(type !== null) this.setState({formType: type});
    else this.setState({formType: "null"});
  };

  //close blog form modal
  closeForm = () =>{
    this.setState({formType: null});
  };

  //handele profile details modal status
  handeDetailsModal = () => {
    let status = this.state.detailsModalStatus;
    status = !status;
    this.setState({detailsModalStatus: status})
    console.log(status);
  };

  //close profile details modal
  closeDetailsModal = () =>{
    this.setState({detailsModalStatus: false});
  };

  //handle blog delete function
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

  render() {
      
      let author = null;
      let blogs = this.props.blogs;
      
      if( this.props.currentUser !== null &&  this.props.template === "myprofile" )
      {
          author =  this.props.authors.filter(a => a.id ===  this.props.currentUser.id)[0];
      }
  
      else{
          author =  this.props.authors.filter(a => a.id === Number( this.props.match.params.id))[0];
      }
      
      blogs =  this.props.blogs.filter(blog => blog.authorId === author.id);
  
  
  
      return ( 
          <React.Fragment>
                  
              {/* Navbar */}
              <Navbar 
                currentUser={this.props.currentUser} 
              />
  
              {/* Author Banner */}
              <AuthorBanner 
                author={author}
              />
  
              {/* Author Info ==> Author<>Mine */}
              <AuthorInfo 
                author={author} 
                blogs={this.props.blogs}
                currentUser={this.props.currentUser}
                handleFormType={this.handleFormType}
                handeDetailsModal={this.handeDetailsModal}
                handleFollowBtn={this.props.handleFollowBtn}
              />
  
              {/* Profile Container */}
              <div className="container-fluid">
                  <div className="row mx-5">
  
                      {/* About Me */}
                      <AboutMe 
                        about={author.about}
                      />
  
                      {/* Author Blogs */}
                      <div className="col-md-8">
                          <div className="d-flex align-items-center my-5 flex-column">
                              {/* Blog Card */}
                              {blogs.map(blog => 
                                  <Blog 
                                    key={blog.id} 
                                    blog={blog} 
                                    authors={this.props.authors} 
                                    currentUser={this.props.currentUser}
                                    onBlogDelete={this.handleBlogDelete}
                                    handleFormType={this.handleFormType}
                                    handleFollowBtn={this.props.handleFollowBtn}
                                  />)
                              }
                          </div>
                          
                          {/* pagination */}
                          <Pagination/>
                          
                      </div>
                                
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
                            onBlogAdd={this.props.onBlogAdd}
                            onBlogUpdate={this.props.onBlogUpdate}
                            onRestoreBlogs={this.props.onRestoreBlogs}
                          />
                        }
                      </div>
                    
                      <ProfileDetails
                        openDetailsModal={this.state.detailsModalStatus}
                        closeDetailsModal={this.closeDetailsModal}
                        author={author}
                      />

                  </div>
              </div>
  
          </React.Fragment>
        );
  }

};
 
export default AuthorProfile;