import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class AuthorInfo extends Component {

    state={
        btnText: ""
    };

    
    componentDidMount(){
        let followings = this.props.currentAuthor?.followings;
        const following = followings?.filter(following => following === this.props.author?._id).length;
        following === 0?
        this.setState({btnText: "Follow"}):
        this.setState({btnText: "Unfollow"});
    }

    //handel follow btn
    handleFollowBtn = async () =>{

        let currentAuthor = this.props.currentAuthor;
        let userId = '';
        let resData = null;

        if(this.state.btnText === "Follow")
        {
            //Clone
            const author = this.props.author;
            //Edit
            currentAuthor.followings.unshift(author._id);
            //setstate
            this.setState({btnText: "Unfollow"});

            userId = author._id;
            const { data } = await axios.post(
                'http://localhost:3000/user/follow', 
                { userId },
                { headers: {"Authorization" : `${this.state.token}`} }
                );

            resData = data.data;
        }
        else
        {
            //clone --> edit
            const author = this.props.author;
            const followings = currentAuthor.followings.filter(following => following !== author._id);
            currentAuthor.followings = followings;
            this.setState({btnText: "Follow"});

            userId = author._id;
            const { data } = await axios.post(
                'http://localhost:3000/user/unfollow', 
                { userId },
                { headers: {"Authorization" : `${this.state.token}`} }
                );

            resData = data.data;
        }

        //State
        this.props.handleFollowBtn(resData);

    };

    render(){

        let followersLink = "#";
        let followingsLink = "#";

        if(this.props.currentAuthor?._id === this.props.author?._id)
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
                                    Blogs <b>{this.props.blogsCount? this.props.blogsCount:0}</b>
                                </li>
                                {/* Followers Count */}
                                <li>
                                    <Link to={followersLink}>
                                        Followers <b>{this.props.author?.followers? this.props.author.followers.length:0}</b>
                                    </Link>
                                </li>
                                {/* Followings Count */}
                                <li>
                                    <Link to={followingsLink}>
                                        Followings <b>{this.props.author?.followings?this.props.author.followings.length:0}</b>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        {this.props.author?._id === this.props.currentAuthor?._id ? 
                            <div className="col-md-4 btn-follow-dstart">
                                {/* New Blog Btn */}
                                <button type="button" className="btn-follow" onClick={()=>this.props.handleFormType("Add")}>
                                    + New Blog
                                </button>
                            </div>:
                            <div className="col-md-4 btn-follow-dstart">
                                {/* Follow Btn */}
                                <button type="button" className="btn-follow" onClick={this.handleFollowBtn}>
                                    {this.state.btnText}
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