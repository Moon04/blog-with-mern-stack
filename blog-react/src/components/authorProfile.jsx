import React, { Component } from 'react';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';

import Navbar from './navbar';
import AuthorBanner from './authorBanner';
import AuthorInfo from './authorInfo';
import ProfileDetails from './profaileDetails';
import Blog from './blog';
import BlogForm from './blogForm';
import Pagination from './pagination';
import { getFromStorage } from '../utilities/storage';

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

  componentDidMount(){
    const token = getFromStorage('user_token');
    if (token) {
      this.setState({token});
      this.getAuthorProfile(token);
    }
    else{
      this.props.history.replace('/notfound');
    }
  }

  async componentDidUpdate(prevProps, prevState) {

    if (this.props !== prevProps && this.props.template === "myprofile") {
      this.getAuthorProfile(this.state.token);
    }
    else if (this.state.activePage !== prevState.activePage) {
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

  //get author blogs backend
  getAuthorBlogs = () =>{
    axios.get("http://localhost:3000/post/userposts/"+this.state.author?._id+`?pageNumber=${this.state.activePage-1}`, 
        { headers: {"Authorization" : `${this.state.token}`} })
        .then(res=>{
          this.setState({blogs: res.data.data});
          this.setState({blogsMetadata: res.data.metadata});
        }).catch(err=>{
          toast("Connectio Error", {type:"error"});
        });
  };

  //get author data from backend
  getAuthorProfile = token =>{
    axios.get("http://localhost:3000/user/info", 
    { headers: {"Authorization" : `${token}`} })
    .then(res=>{
      this.setState({currentAuthor: res.data.data[0]});
      
      if(this.props.template === "myprofile")
      {
        this.setState({author: this.state.currentAuthor});
        this.getAuthorBlogs(); 
      }
      else
      {
        axios.get("http://localhost:3000/user/info/"+this.props.match.params.id, 
        { headers: {"Authorization" : `${token}`} })
        .then(res=>{
          this.setState({author: res.data.data[0]});
          this.getAuthorBlogs(); 
         }).catch(err=>{
           this.props.history.replace('/notfound');
         });
         
       }
    }).catch(err=>{
        this.props.history.replace('/notfound');
      });
  };
  
  //handele profile details modal status
  handeDetailsModal = () => {
    let status = this.state.detailsModalStatus;
    status = !status;
    this.setState({detailsModalStatus: status})
  };

  //close profile details modal
  closeDetailsModal = () =>{
    this.setState({detailsModalStatus: false});
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

  //handle blog delete function
  handleBlogDelete = async blog => {

    try {
      //Call BackEnd
      const { data } = await axios.delete(
        `http://localhost:3000/post/${blog._id}`,
        { headers: {"Authorization" : `${this.state.token}`} });

        this.setState({blogDeleted: !this.state.blogDeleted});

        //State
        this.props.onBlogDelete(blog);
        
      } catch (error) {
        //Print Error
        if (error.response && error.response.status === 404) {
          toast("Blog already Deleted");
        } else {
          toast("Something went wrong!");
        }
      }
  };

  //handle blog add function
  handleBlogAdded = blog =>{
    this.setState({blogAdded: !this.state.blogAdded});
    this.props.onBlogAdd(blog);
  };

  //handle blog edit function
  handleBlogEdited = blog =>{
    this.setState({blogEdited: !this.state.blogEdited});
    this.props.onBlogUpdate(blog);
  };
  
  //handle page change
  handlePageChange = page => {
    this.setState({ activePage: page });
  };

  render() {

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
          <div className="justify-content-center d-flex">

              {/* Author Blogs */}
                <div className="d-flex align-items-center my-5 flex-column">
                <ToastContainer />
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
                    {
                        this.state.blogs.length===0 &&
                        <div className="no-blogs">
                            You Haven't Created Any Blogs Yet!<br/>
                            Create Your Own Blogs And Share It With Other Authors
                        </div>
                    }
                    
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
      </React.Fragment>
    );
  }

}
 
export default AuthorProfile;