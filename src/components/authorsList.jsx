import React, { Component } from 'react';
import axios from "axios";

import Navbar from './navbar';
import AuthorCard from './authorCard';
import { getFromStorage } from '../utilities/storage';

class AuthorsList extends Component {

    state={
        token: '',
        currentAuthor: {},
        authors : [],
        follow: true
    };

    async componentDidMount(){
        const token = getFromStorage('user_token');
        if (token) {
            this.setState({token});

            this.getAuthors(token);
        }
        else{
            this.props.history.replace('/notfound');
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.state.follow !== prevState.follow) {
            this.getAuthors(this.state.token); 
          }
      }

    getAuthors= token =>{
    axios.get(process.env.REACT_APP_BACKEND_URL+"/user/info", 
    { headers: {"Authorization" : `${token}`} })
    .then(res=>{

        let currentAuthor = res.data.data[0];
        console.log(currentAuthor)
        let authors = [];

        if(this.props.listType === "followings")
        {
            authors = currentAuthor.followings;
        }
        else if(this.props.listType === "followers")
        {
            authors = currentAuthor.followers;
        }

        this.setState({currentAuthor});
        this.setState({authors});
    }).catch(err=>{
        this.props.history.replace('/notfound');
    });
    };

    handleFollowBtn = author =>
    {
        this.setState({follow: !this.state.follow});
        this.props.handleFollowBtn(author)
    };

    render(){
        
        return ( 
            
            <React.Fragment>
                    
                {/* Navbar */}
                <Navbar/>

                {/* Authors List Container */}
                <div className="container-fluid">
                    <section className="py-5">
                        {this.state.authors.length!==0?
                            <div className="authors-list">

                                {/* List Title */}
                                <div className="list-title">
                                    {this.props.listType === "followers"?
                                        "Followers":
                                        "Followings"
                                    }
                                </div>

                                {/* List Body */}
                                <ul className="list-body pl-0">
                                    {this.state.authors?.map(author => 
                                        <AuthorCard 
                                            key={author}
                                            currentAuthor={this.props.currentAuthor}
                                            author={author}
                                            handleFollowBtn={this.handleFollowBtn}
                                        />)
                                    }
                                </ul>
                            </div>:
                            <div className="no-followings pt-5" style={{marginTop: "7rem"}}>
                            {this.props.listType === "followers"?
                                "You Have No Followers!"
                                :
                                "You Have No Followings!"
                            }
                            </div>
                        }
                    </section>
                </div>
            </React.Fragment>
        );
    }
}

export default AuthorsList;