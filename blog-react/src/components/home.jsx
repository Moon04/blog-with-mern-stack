import React, { Component } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";

import { getFromStorage } from '../utilities/storage';

import Navbar from './navbar';
import AboutUs from './aboutUs';
import BlogForm from './blogForm';
import Blog from './blog';
import Pagination from './pagination';

class Home extends Component {

    state={
        token: '',
        formType: null,
        currentAuthor: {}
      };

      async componentDidMount(){

        const token = getFromStorage('user_token');
        if (token) 
        {
          const {data} = await axios.get("http://localhost:3000/user/info", 
          { headers: {"Authorization" : `${token}`} });

          this.setState({token});
          this.setState({currentAuthor: data.data[0]})
        }  

      }
    
      //handle blog form type -add/edit- function
      handleFormType = (type) =>{
        if(type === "Add") this.setState({formType: "Add"});
        else if(type !== null) this.setState({formType: type});
        else this.setState({formType: null});
      };
    
      //clode blog form modal
      closeForm = () =>{
        this.setState({formType: null});
      };

      //handle blog delete
      handleBlogDelete = async blog => {

          //Copy Orignal Data
          // const orignalData = [...this.props.blogs];

          try {

            //Call BackEnd
            const { data } = await axios.delete(
              `http://localhost:3000/post/${blog._id}`,
              { headers: {"Authorization" : `${this.state.token}`} });

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

    render(){
        return ( 
            <React.Fragment>

                {/* Navbar ==> Loggedin / Anonymous */}
                <Navbar
                  handleSearchInput={this.props.handleSearchBtn}
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
                            {this.state.token?
                              <BlogForm
                                  formType="Add"
                                  modal={false}
                                  onBlogAdd={this.props.onBlogAdd}
                                  onBlogUpdate={this.props.onBlogUpdate}
                                  onBlogDelete={this.handleBlogDelete}
                              />:
                              <AboutUs/>
                            }
                        </div>

                        {/* All Authors Blogs */}
                        <div className="col-md-8">
                            <div className="d-flex align-items-center my-5 flex-column">

                                {/* Blog Card */}   
                                {this.props.blogs.map(blog => 
                                  <Blog 
                                      key={blog._id} 
                                      blog={blog} 
                                      currentAuthor={this.state.currentAuthor} 
                                      authors={this.props.authors}
                                      onBlogDelete={this.handleBlogDelete}
                                      handleFormType={this.handleFormType}
                                      handleFollowBtn={this.props.handleFollowBtn}
                                  />
                                  )
                                }
                            </div>
                            {/* pagination */}
                            {
                              this.props.blogsMetadata?.pages > 1 &&
                              <Pagination
                                activePage={this.props.activePage}
                                pagesCount={this.props.blogsMetadata?.pages}
                                onPageChange={this.props.handlePageChange}
                              />
                            }
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
                            modal={true}
                            formType={this.state.formType}
                            closeForm={this.closeForm}
                            onBlogUpdate={this.props.onBlogUpdate}
                          />
                        }
                      </div>

                </div>
            </React.Fragment>
        );
    }
}
 
export default Home;