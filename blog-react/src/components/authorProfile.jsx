import React, { Component } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";

import { getFromStorage } from '../utilities/storage';

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
    token: '',
    formType: null,
    detailsModalStatus: false,
    author: null, 
    currentAuthor: null,
    blogs: [],
    activePage: 1,
    blogsMetadata: null,
    blogAdded: false,
    blogDeleted: false,
    blogEdited: false
  };


  getAuthorBlogs = async () =>{
    const {data: blogs}= await axios.get("http://localhost:3000/post/userposts/"+this.state.author?._id+`?pageNumber=${this.state.activePage-1}`, 
        { headers: {"Authorization" : `${this.state.token}`} });
        
        this.setState({blogs: blogs.data});
        this.setState({blogsMetadata: blogs.metadata});
  }

  async componentDidMount(){
    const token = getFromStorage('user_token');
    if (token) {

      const {data: currentAuthor} = await axios.get("http://localhost:3000/user/info", 
      { headers: {"Authorization" : `${token}`} });
      
      this.setState({token});
      this.setState({currentAuthor: currentAuthor.data[0]})


       if(this.props.template === "myprofile")
       {
          this.setState({author: this.state.currentAuthor});
       }
       else
       {
          const {data: author} = await axios.get("http://localhost:3000/user/info/"+this.props.match.params.id, 
          { headers: {"Authorization" : `${token}`} });
          
          this.setState({author: author.data[0]})
        }

        this.getAuthorBlogs(); 
       
      }
    }

    async componentDidUpdate(prevProps, prevState) {
      if (this.state.activePage !== prevState.activePage) {
        this.getAuthorBlogs(); 
      }
      else if (this.state.blogDeleted !== prevState.blogDeleted) {
        this.getAuthorBlogs(); 
      }
      else if (this.state.blogAdded !== prevState.blogAdded) {
        this.getAuthorBlogs(); 
      }
      else if (this.state.blogEdited !== prevState.blogEdited) {
        this.getAuthorBlogs(); 
      }
    }

    //handle page change
    handlePageChange = page => {
      this.setState({ activePage: page });
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
    // const orignalData = [...this.props.blogs];
  
    //State
    this.props.onBlogDelete(blog);
    
    try {

      //Call BackEnd
      const { data } = await axios.delete(
        `http://localhost:3000/post/${blog._id}`,
        { headers: {"Authorization" : `${this.state.token}`} });

        this.setState({blogDeleted: !this.state.blogDeleted})

        //State
        this.props.onBlogDelete(blog);
        
      } catch (error) {
        //Print Error
        if (error.response && error.response.status === 404) {
          toast("Blog already Deleted");
        } else {
          toast("Something went wrong!");
        }
        //Restore Data
        // this.props.onRestoreBlogs(orignalData);
      }
    };

    handleBlogAdded = blog =>{
      this.setState({blogAdded: !this.state.blogAdded});
      this.props.onBlogAdd(blog);
    }

    handleBlogEdited = blog =>{
      this.setState({blogEdited: !this.state.blogEdited});
      this.props.onBlogUpdate(blog);
    }


    //pagination
    handlePageChange = page=>{
      this.setState({activePage: page});
    };
    
    render() {

      // return "profile";     
      return ( 
        <React.Fragment>
                  
              {/* Navbar */}
              <Navbar/>
  
              {/* Author Banner */}
              <AuthorBanner 
                author={this.state.author}
                currentAuthor={this.state.currentAuthor}
                />
  
              {/* Author Info ==> Author<>Mine */}
              <AuthorInfo 
                author={this.state.author} 
                blogsCount={this.state.blogsMetadata?.postsCount}
                currentAuthor={this.state.currentAuthor}
                handleFormType={this.handleFormType}
                handeDetailsModal={this.handeDetailsModal}
                handleFollowBtn={this.props.handleFollowBtn}
              />
  
              {/* Profile Container */}
              <div className="container-fluid">
                  <div className="row mx-5">
  
                      {/* About Me */}
                      <AboutMe 
                        about={this.state.author?.about}
                      />
  
                      {/* Author Blogs */}
                      <div className="col-md-8">
                          <div className="d-flex align-items-center my-5 flex-column">
                              {/* Blog Card */}
                              {this.state.blogs?.map(blog => 
                                  <Blog 
                                    key={blog._id} 
                                    blog={blog} 
                                    currentAuthor={this.state.currentAuthor}
                                    onBlogDelete={this.handleBlogDelete}
                                    handleFormType={this.handleFormType}
                                    handleFollowBtn={this.props.handleFollowBtn}
                                  />)
                              }
                          </div>
                          
                          {/* pagination */}
                          {
                            this.state.blogsMetadata?.pages>1 &&
                            <Pagination
                            activePage={this.state.activePage}
                            pagesCount={this.state.blogsMetadata?.pages}
                            onPageChange={this.handlePageChange}
                            />
                          }
                          
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
                            currentAuthor={this.state.currentAuthor}
                            onBlogAdd={this.handleBlogAdded}
                            onBlogUpdate={this.handleBlogEdited}
                          />
                        }
                      </div>
                    
                      <ProfileDetails
                        openDetailsModal={this.state.detailsModalStatus}
                        closeDetailsModal={this.closeDetailsModal}
                        author={this.state.author}
                      />

                  </div>
              </div>
  
          </React.Fragment>
        );
  }

};
 
export default AuthorProfile;