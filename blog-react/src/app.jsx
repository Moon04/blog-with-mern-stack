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

    async componentDidMount() {

        const { data: authors } = await axios.get("http://localhost:3000/authors");
        this.setState({ authors });

        const  { data: blogs } = await axios.get("http://localhost:3000/blogs");
        this.setState({ blogs});
    }
    
    handleRestoreBlogs = blogs => {
        this.setState({ blogs });
    };
    
    handleCurrentUser = author => {
        this.setState({currentUser: author});
    };

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

    handleBlogAdd = blog => {
        //Clone
        const blogs = [...this.state.blogs];
        //Edit
        blogs.unshift(blog);
        //Stste
        this.setState({ blogs });
    };

    handleBlogDelete = blog => {
        //clone --> edit
        const blogs = this.state.blogs.filter(b => b.id !== blog.id);
        //Set State
        this.setState({ blogs });
    };
    
    handleBlogUpdate = blog => {
        //Clone
        const blogs = [...this.state.blogs];
        //Edit
        const index = blogs.findIndex(b => b.id === blog.id);
        blogs[index] = blog;
        //Set State
        this.setState({ blogs });
    };

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
                    <Route path="/signin" 
                        render={ props => (
                            <Signin
                                {...props}
                                onSignIn={this.handleCurrentUser}
                            />
                        )}
                    />
                    <Route path="/signup" 
                        render={ props => (
                            <Signup
                                {...props}
                                onAuthorRegister={this.handleAuthorRegister}
                            />
                        )}
                    />

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

                    <Route path="/notfound" component={NotFound}/>

                    <Redirect from="/" to="/home"/>
                    <Redirect to="/notfound"/>
                </Switch>
            </React.Fragment>
        );
    }
}

export default App;