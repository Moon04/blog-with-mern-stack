import React, { Component } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { Link } from 'react-router-dom';
import axios from 'axios';

class AuthorInfo extends Component {

    state={
        btnText: "",
        followersLink: "#",
        followingsLink: "#"
    };
    
    componentDidUpdate(prevProps, prevState){
        if(this.props!== prevProps)
        {
            let followings = this.props.currentAuthor?.followings;
            const following = followings?.filter(following => following === this.props.author?._id).length;
            following !== 0?
            this.setState({btnText: "Unfollow"}):
            this.setState({btnText: "Follow"});
        
            if(this.props.currentAuthor?._id === this.props.author?._id)
            {
                this.setState({
                    followersLink: "/followers",
                    followingsLink: "/followings"
                });
            }
        }
    }
    
    //handel follow btn
    handleFollowBtn = () =>{
        
        let userId = '';
        let resData = null;
        let currentAuthor = this.props.currentAuthor;
        
        if(this.state.btnText === "Follow")
        {
            //Clone
            const author = this.props.author;
            userId = author._id;
            axios.post(
                'http://localhost:3000/user/follow', 
                { userId },
                { headers: {"Authorization" : `${this.state.token}`} }
                ).then(res=>{
                    //Edit
                    currentAuthor.followings.unshift(author._id);
                    //setstate
                    this.setState({btnText: "Unfollow"});
                    
                    resData = res.data.data;
                }).catch(err=>{
                    if (err.response.status === 404) {
                        //no such user
                        toast(err.response.data, {type:"error"});
                    }
                    else if (err.response.status === 417) {
                        //you can't follow yourself
                        toast(err.response.data, {type:"error"});
                    }
                    else if (err.response.status === 409) {
                        //already follow
                        toast(err.response.data, {type:"dark"});
                    }
                    else toast("Connection Error", {type:"error"});
                });
        }
        else
        {
            const author = this.props.author;
            userId = author._id;

            axios.post(
            'http://localhost:3000/user/unfollow', 
            { userId },
            { headers: {"Authorization" : `${this.state.token}`} }
            ).then(res=>{
                //clone --> edit
                const followings = currentAuthor.followings.filter(following => following !== author._id);
                currentAuthor.followings = followings;
                this.setState({btnText: "Follow"});
                resData = res.data.data;
            }).catch(err=>{
                if (err.response.status === 404) {
                    //no such user
                    toast(err.response.data, {type:"error"});
                }
                else if (err.response.status === 409) {
                    //already follow
                    toast(err.response.data, {type:"dark"});
                }
                else toast("Connection Error", {type:"error"});
            });  
        }
        
        //State
        this.props.handleFollowBtn(resData);
    };
        
    render(){
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
                                    <Link to={this.state.followersLink}>
                                        Followers <b>{this.props.author?.followers? this.props.author.followers.length:0}</b>
                                    </Link>
                                </li>
                                {/* Followings Count */}
                                <li>
                                    <Link to={this.state.followingsLink}>
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
                        <ToastContainer />
                    </div>
                </section>
            </React.Fragment>
        );
    }
}
 
export default AuthorInfo;