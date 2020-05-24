import React from 'react';
import axios from "axios";

import { getFromStorage } from '../utilities/storage';

import Navbar from './navbar';
import AuthorCard from './authorCard';
import { Component } from 'react';

class AuthorsList extends Component {

    state={
        currentAuthor: {},
        authors : []
    };

    async componentDidMount(){
        const token = getFromStorage('user_token');
        if (token) {

            const {data} = await axios.get("http://localhost:3000/user/info", 
            { headers: {"Authorization" : `${token}`} });

            let currentAuthor = data.data[0];
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
        }
    }


    render(){
        
        return ( 
            <React.Fragment>
                    
                    {/* Navbar */}
                    <Navbar/>

                {/* Authors List Container */}
                    <div className="container-fluid">
                        <section className="py-5">
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
                                    {this.state.authors.map(author => 
                                        <AuthorCard 
                                            key={author._id}
                                            currentAuthor={this.props.currentAuthor}
                                            author={author}
                                            handleFollowBtn={this.props.handleFollowBtn}
                                        />)
                                    }
                                </ul>
                            </div>
                        </section>
                    </div>
                </React.Fragment>
        );
    }
}

export default AuthorsList;