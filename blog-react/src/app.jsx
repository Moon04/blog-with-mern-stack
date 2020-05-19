import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import Home from './components/home';
import Signin from './components/signin';
import Signup from './components/signup';
import AuthorProfile from './components/authorProfile';
import AuthorsList from './components/authorsList';
import NotFound from './components/notFound';
import FollowingsBlogs from './components/followingsBlogs';

class App extends React.Component {

    state = {
        currentUser: null, 
        authors: [],
        blogs: []
    };

    // Get: authors and blogs from database
    async componentDidMount() {

        const { data: authors } = await axios.get("http://localhost:3000/authors");
        this.setState({ authors });

        const  { data: blogs } = await axios.get("http://localhost:3000/blogs");
        this.setState({ blogs});
    }
    
    //handle changes in blogs
    handleRestoreBlogs = blogs => {
        this.setState({ blogs });
    };
    
    //handle current user
    handleCurrentUser = author => {
        this.setState({currentUser: author});
    };

    //handle sign up form
    handleAuthorRegister = author => {
        //Clone
        const authors = [...this.state.authors];
        //Edit
        authors.unshift(author);
        //Stste
        this.setState({ authors });

        //current user
        this.setState({currentUser: author});
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
        const blogs = this.state.blogs.filter(b => b.id !== blog.id);
        //Set State
        this.setState({ blogs });
    };
    
    //handle edit blog
    handleBlogUpdate = blog => {
        //Clone
        const blogs = [...this.state.blogs];
        //Edit
        const index = blogs.findIndex(b => b.id === blog.id);
        blogs[index] = blog;
        //Set State
        this.setState({ blogs });
    };

    //handle follow btn
    handleFollowBtn = author => {
        //Clone
        const authors = [...this.state.authors];
        //Edit
        const index = authors.findIndex(a => a.id === author.id);
        authors[index] = author;
        //Set State
        this.setState({ authors });
    };

    render() {

        return (
            <React.Fragment>
                <Switch>
                    {/* SignIn */}
                    <Route path="/signin" 
                        render={ props => (
                            <Signin
                                {...props}
                                onSignIn={this.handleCurrentUser}
                            />
                        )}
                    />

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
                                currentUser={this.state.currentUser} 
                                authors={this.state.authors} 
                                blogs={this.state.blogs}
                                onBlogAdd={this.handleBlogAdd}
                                onBlogUpdate={this.handleBlogUpdate}
                                onBlogDelete={this.handleBlogDelete}
                                onRestoreBlogs={this.handleRestoreBlogs}
                                handleFollowBtn={this.handleFollowBtn}
                            />
                        )}
                    />

                    {/* My Profile */}
                    <Route path="/myprofile" 
                        render={ props => (
                            <AuthorProfile
                                {...props}
                                currentUser={this.state.currentUser}
                                template="myprofile" 
                                authors={this.state.authors}
                                blogs={this.state.blogs}
                                onBlogAdd={this.handleBlogAdd}
                                onBlogUpdate={this.handleBlogUpdate}
                                onBlogDelete={this.handleBlogDelete}
                                onRestoreBlogs={this.handleRestoreBlogs}
                            />
                        )}
                    />

                    {/* Author Profile */}
                    <Route path="/authorProfile/:id" 
                        render={ props => (
                            <AuthorProfile
                                {...props} 
                                currentUser={this.state.currentUser} 
                                template="authorprofile"
                                authors={this.state.authors}
                                blogs={this.state.blogs}
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
                                currentUser={this.state.currentUser}
                                authors={this.state.authors}
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
                                currentUser={this.state.currentUser}
                                authors={this.state.authors}
                                handleFollowBtn={this.handleFollowBtn}
                            />
                        )}
                    />

                    {/* Followings' Blogs */}
                    <Route path="/followingsblogs" 
                        render={ props => (
                            <FollowingsBlogs 
                                {...props}
                                currentUser={this.state.currentUser}
                                authors={this.state.authors}
                                blogs={this.state.blogs}
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