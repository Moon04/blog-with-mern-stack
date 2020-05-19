import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class AuthorInfo extends Component {

    state={
        btnText: ""
    };

    
    componentDidMount(){
        let followings = this.props.currentUser.followings;
        const following = followings.filter(following => following === this.props.author.id).length;
        following === 0?
        this.setState({btnText: "Follow"}):
        this.setState({btnText: "Unfollow"});
    }

    //handel follow btn
    handleFollowBtn = async () =>{

        let currenrUser = this.props.currentUser;

        if(this.state.btnText === "Follow")
        {
            //Clone
            const author = this.props.author;
            //Edit
            currenrUser.followings.unshift(author.id);
            //setstate
            this.setState({btnText: "Unfollow"});
        }
        else
        {
            //clone --> edit
            const author = this.props.author;
            const followings = currenrUser.followings.filter(following => following !== author.id);
            currenrUser.followings = followings;
            this.setState({btnText: "Follow"});
        }

        //call backend
        const { data } = await axios.put(
        `http://localhost:3000/authors/${this.props.currentUser.id}`,
        currenrUser
        );

        //State
        this.props.handleFollowBtn(data);
        // window.location.reload(false);
    };

    render(){
        let blogs = [];
        blogs = this.props.blogs.filter(blog => blog.authorId === this.props.author.id);

        let followersLink = "#";
        let followingsLink = "#";

        if(this.props.currentUser.id === this.props.author.id)
        {
            followersLink = "/followers";
            followingsLink = "/followings";
        }

        return ( 

            <React.Fragment>
                <section className="author-profile">
                    <div className="row profile-details">
                        <div className="col-md-4 details-link">
                            {/* author details btn */}
                            <button type="button" className="btn-details" onClick={this.props.handeDetailsModal}>
                                Profile Details
                            </button>
                        </div>
                        <div className="col-md-4 df-jc">
                            <ul className="blogs-menu">
                                {/* Blogs Count */}
                                <li>
                                    Blogs <b>{blogs.length}</b>
                                </li>
                                {/* Followers Count */}
                                <li>
                                    <Link to={followersLink}>
                                        Followers <b>{this.props.author.followers.length}</b>
                                    </Link>
                                </li>
                                {/* Followings Count */}
                                <li>
                                    <Link to={followingsLink}>
                                        Followings <b>{this.props.author.followings.length}</b>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        {this.props.author.id !== this.props.currentUser.id ? 
                            <div className="col-md-4 btn-follow-dstart">
                                {/* Follow Btn */}
                                <button type="button" className="btn-follow" onClick={this.handleFollowBtn}>
                                    {this.state.btnText}
                                </button>
                            </div>
                            :
                            <div className="col-md-4 btn-follow-dstart">
                                {/* New Blog Btn */}
                                <button type="button" className="btn-follow" onClick={()=>this.props.handleFormType("Add")}>
                                    + New Blog
                                </button>
                            </div>
                        }
                    </div>
                </section>
            </React.Fragment>
        );
    }
}
 
export default AuthorInfo;