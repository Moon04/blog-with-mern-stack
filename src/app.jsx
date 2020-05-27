import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import Signin from './components/signin';
import Signup from './components/signup';
import Home from './components/home';
import AuthorProfile from './components/authorProfile';
import AuthorsList from './components/authorsList';
import FollowingsBlogs from './components/followingsBlogs';
import NotFound from './components/notFound';
import { getFromStorage } from './utilities/storage';

class App extends React.Component {

    state = {
        token: '',
        authors: [],
        blogs: [],
        blogsMetadata: 0,
        activePage: 1,
        follow: true
    };

    
    // Get: authors and blogs from database
    async componentDidMount() {
        
        const token = getFromStorage('user_token');
        if (token) 
        {
            this.setState({token})
        }
        const { data: authorsData } = await axios.get(process.env.REACT_APP_BACKEND_URL+"/basicdata/users");
        await this.setState({ authors: authorsData.data });
        
        this.getAuthorsBlogs();
    }
    
    async componentDidUpdate(prevProps, prevState) {
        if (this.state.activePage !== prevState.activePage) {
            this.getAuthorsBlogs(); 
        }
        else  if (this.state.follow !== prevState.follow) {
            this.getAuthorsBlogs(); 
            }
    }
        
    //get authors from backend
    getAuthorsBlogs = async () =>{
        const { data: blogsData } = await axios.get(process.env.REACT_APP_BACKEND_URL+`/basicdata/posts?pageNumber=${this.state.activePage-1}`);
        await this.setState({ blogs: blogsData.data});
        await this.setState({ blogsMetadata: blogsData.metadata });
    };

    //handle sign up form
    handleAuthorRegister = author => {
        //Clone
        const authors = [...this.state.authors];
        //Edit
        authors.unshift(author);
        //Stste
        this.setState({ authors });
    };

    //handle search btn
    handleSearchBtn = async term =>{
        if(term)
        {
            const { data: blogsData } = await axios.get(process.env.REACT_APP_BACKEND_URL+`/post/search/"${term}"?pageNumber=${this.state.activePage-1}`,
            { headers: {"Authorization" : `${this.state.token}`} });
            await this.setState({ blogs: blogsData.data});
            await this.setState({ blogsMetadata: blogsData.metadata });
        }
    };

    //handle add new blog
    handleBlogAdd = blog => {
        //Clone
        const blogs = [...this.state.blogs];
        //Edit
        blogs.unshift(blog);
        //Stste
        this.setState({ blogs });
    };

    //handle delete blog
    handleBlogDelete = blog => {
        //clone --> edit
        const blogs = this.state.blogs.filter(b => b._id !== blog._id);
        //Set State
        this.setState({ blogs });
    };
    
    //handle edit blog
    handleBlogUpdate = blog => {
        //Clone
        const blogs = [...this.state.blogs];
        //Edit
        const index = blogs.findIndex(b => b._id === blog._id);
        blogs[index] = blog;
        //Set State
        this.setState({ blogs });
    };

    //handle follow btn
    handleFollowBtn = author => {
        this.setState({follow: !this.state.follow});
    };

     //handle page change
     handlePageChange = page => {
        this.setState({ activePage: page });
      };

    render() {

        return (
            <React.Fragment>
                <Switch>
                    {/* SignIn */}
                    <Route path="/signin" component={Signin}/>

                    {/* Signup */}
                    <Route path="/signup" 
                        render={ props => (
                            <Signup
                                {...props}
                                onAuthorRegister={this.handleAuthorRegister}
                            />
                        )}
                    />

                    {/* Home */}
                    <Route path="/home" exact 
                        render={ props => (
                            <Home 
                                {...props}
                                activePage={this.activePage}
                                blogs={this.state.blogs}
                                authors={this.state.authors}
                                blogsMetadata={this.state.blogsMetadata}
                                onBlogAdd={this.handleBlogAdd}
                                onBlogUpdate={this.handleBlogUpdate}
                                onBlogDelete={this.handleBlogDelete}
                                handleFollowBtn={this.handleFollowBtn}
                                handlePageChange={this.handlePageChange}
                                handleSearchBtn={this.handleSearchBtn}
                            />
                        )}
                    />

                    {/* My Profile */}
                    <Route path="/myprofile" 
                        render={ props => (
                            <AuthorProfile
                                {...props}
                                template="myprofile" 
                                onBlogAdd={this.handleBlogAdd}
                                onBlogUpdate={this.handleBlogUpdate}
                                onBlogDelete={this.handleBlogDelete}
                            />
                        )}
                    />

                    {/* Author Profile */}
                    <Route path="/authorProfile/:id" 
                        render={ props => (
                            <AuthorProfile
                                {...props} 
                                template="authorprofile"
                                handleFollowBtn={this.handleFollowBtn}
                            />
                        )}
                    />

                    {/* Followings List */}
                    <Route path="/followings" 
                        render={ props => (
                            <AuthorsList 
                                {...props}
                                listType="followings"
                                handleFollowBtn={this.handleFollowBtn}
                            />
                        )}
                    />

                    {/* Followers List */}
                    <Route path="/followers" 
                        render={ props => (
                            <AuthorsList 
                                {...props}
                                listType="followers"
                                handleFollowBtn={this.handleFollowBtn}
                            />
                        )}
                    />

                    {/* Followings' Blogs */}
                    <Route path="/followingsblogs" 
                        render={ props => (
                            <FollowingsBlogs 
                                {...props}
                                handleFollowBtn={this.handleFollowBtn}
                            />
                        )}
                    />

                    {/* NotFound Page */}
                    <Route path="/notfound" component={NotFound}/>

                    {/* Redirect to Home */}
                    <Redirect from="/" to="/home"/>

                    {/* Redirect to NotFound Page */}
                    <Redirect to="/notfound"/>
                </Switch>
            </React.Fragment>
        );
    }
}

export default App;