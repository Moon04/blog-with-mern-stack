import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './components/home';
import Signin from './components/signin';
import Signup from './components/signup';
import AuthorProfile from './components/authorProfile';
import AuthorsList from './components/authorsList';
import NotFound from './components/notFound';

class App extends React.Component {

    state = {
        currentUser: 1,
        authors: [
            {id: 1, fName: "mona", lName: "mohamed", username: "mona11", email: "mona@gmail.com", password: "blabla", avatar: "../images/katara.jpg", about: "blaaaaaaaaa blaaaaaaaaaaaaaaaaa", followers: [3, 4, 5], following: [2, 5] },
            {id: 2, fName: "hamis", lName: "mohamed", username: "hamis22", email: "hamis@gmail.com", password: "blabla", avatar: "../images/katara.jpg", about: "blaaaaaaaaa blaaaaaaaaaaaaaaaaa", followers: [1, 3, 5], following: [1, 3, 6]},
            {id: 3, fName: "basant", lName: "mohamed", username: "basant33", email: "basant@gmail.com", password: "blabla", avatar: "../images/katara.jpg", about: "blaaaaaaaaa blaaaaaaaaaaaaaaaaa", followers: [1, 5, 6], following: [1, 2, 6]},
            {id: 4, fName: "mariam", lName: "mohamed", username: "mariam44", email: "mariam@gmail.com", password: "blabla", avatar: "../images/katara.jpg", about: "blaaaaaaaaa blaaaaaaaaaaaaaaaaa", followers: [1, 6], following: [1, 5]},
            {id: 5, fName: "reem", lName: "mohamed", username: "reem55", email: "reem@gmail.com", password: "blabla", avatar: "../images/katara.jpg", about: "blaaaaaaaaa blaaaaaaaaaaaaaaaaa", followers: [1, 3, 6], following: [1, 2, 3]},
            {id: 6, fName: "esraa", lName: "mohamed", username: "esraa66", email: "esraa@gmail.com", password: "blabla", avatar: "../images/katara.jpg", about: "blaaaaaaaaa blaaaaaaaaaaaaaaaaa", followers: [2, 3], following: [3, 4, 5]}
        ],
        blogs: [
            {id: 1, authorId: 1, title: "First Mona's Blog", body: "blaaaaaaaaaaaaaa lllaaaaaaaaaaaaaaaa bllllaaaaaaaaaaa bbbbbbbbbbbbbbbbbbbbb", tags: ["Art", "Fun"], img: "/images/blog1-img.jpg"},
            {id: 2, authorId: 3, title: "First Basant's Blog", body: "blaaaaaaaaaaaaaa lllaaaaaaaaaaaaaaaa bllllaaaaaaaaaaa bbbbbbbbbbbbbbbbbbbbb", tags: ["Art", "Fun"], img: "/images/blog2-img.jpg"},
            {id: 3, authorId: 6, title: "First Esraa's Blog", body: "blaaaaaaaaaaaaaa lllaaaaaaaaaaaaaaaa bllllaaaaaaaaaaa bbbbbbbbbbbbbbbbbbbbb", tags: ["Art", "Fun"], img: "/images/blog3-img.jpg"},
            {id: 4, authorId: 1, title: "Second Mona's Blog", body: "blaaaaaaaaaaaaaa lllaaaaaaaaaaaaaaaa bllllaaaaaaaaaaa bbbbbbbbbbbbbbbbbbbbb", tags: ["Art", "Fun"], img: "/images/blog4-img.jpg"},
            {id: 5, authorId: 4, title: "First Mariam's Blog", body: "blaaaaaaaaaaaaaa lllaaaaaaaaaaaaaaaa bllllaaaaaaaaaaa bbbbbbbbbbbbbbbbbbbbb", tags: ["Art", "Fun"], img: "/images/blog1-img.jpg"},
            {id: 6, authorId: 2, title: "First Hamis's Blog", body: "blaaaaaaaaaaaaaa lllaaaaaaaaaaaaaaaa bllllaaaaaaaaaaa bbbbbbbbbbbbbbbbbbbbb", tags: ["Art", "Fun"], img: "/images/blog2-img.jpg"},
            {id: 7, authorId: 5, title: "First Reem's Blog", body: "blaaaaaaaaaaaaaa lllaaaaaaaaaaaaaaaa bllllaaaaaaaaaaa bbbbbbbbbbbbbbbbbbbbb", tags: ["Art", "Fun"], img: "/images/blog3-img.jpg"}

        ]
    };

    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route path="/signin" component={Signin}/>
                    <Route path="/signup" component={Signup}/>

                    <Route path="/home" exact render={ props => (
                        <Home 
                            {...props}
                            currentUser={this.state.currentUser} 
                            authors={this.state.authors} 
                            blogs={this.state.blogs}/>
                    )}/>

                    <Route path="/authorProfile/:id" render={ props => (
                        <AuthorProfile
                            {...props} 
                            author={this.state.authors[0]}
                            blogs={this.state.blogs}/>
                    )}/>

                    <Route path="/followings" render={ props => (
                        <AuthorsList 
                            {...props}
                            listType="followings"
                            authors={this.state.authors}/>
                    )}/>
                    <Route path="/followers" render={ props => (
                        <AuthorsList 
                            {...props}
                            listType="followers"
                            authors={this.state.authors}/>
                    )}/>
                    <Route path="/notfound" component={NotFound}/>

                    <Redirect from="/" to="/home"/>
                    <Redirect to="/notfound"/>
                </Switch>
            </React.Fragment>
        );
    }
}

export default App;