import React, { Component } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { Link } from 'react-router-dom';
import axios from 'axios';

import { getFromStorage } from '../utilities/storage';


class AuthorCard extends Component {

    state={
        token: '',
        btnText: "Unfollow",
        author: {}
    };

    //get author profile data
    getAuthorProfile= token =>{
        axios.get(process.env.REACT_APP_BACKEND_URL+"/user/info/"+this.props.author, 
        { headers: {"Authorization" : `${token}`} })
        .then(res=>{
            this.setState({author: res.data.data[0]});
        }).catch(err=>{
            console.log(err);
        });
    }

    componentDidMount(){
        const token = getFromStorage('user_token');
        if (token) {
            this.setState({token});
            this.getAuthorProfile(token);
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props !== prevProps)
        {
            let followings = this.props.currentAuthor?.followings;
            const following = followings?.filter(following => following === this.props.author?._id).length;
            following !== 0?
            this.setState({btnText: "Unfollow"}):
            this.setState({btnText: "Follow"});
        }
    }

    //handle follow btn
    handleFollowBtn = async () =>{

        let resData = null;
        let userId = null;

        if(this.state.btnText === "Follow")
        {
            //Clone
            const author = this.props.author;
            userId = author;
            axios.post(
                process.env.REACT_APP_BACKEND_URL+'/user/follow', 
                { userId },
                { headers: {"Authorization" : `${this.state.token}`} }
                ).then(res=>{
                    //setstate
                    this.setState({btnText: "Unfollow"});
                    resData = res.data.data;
                    this.props.handleFollowBtn(resData);
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
            userId = author;

            axios.post(
            process.env.env.REACT_APP_BACKEND_URL+'/user/unfollow', 
            { userId },
            { headers: {"Authorization" : `${this.state.token}`} }
            ).then(res=>{
                this.setState({btnText: "Follow"});
                resData = res.data.data;
                this.props.handleFollowBtn(resData);
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
    };

    render(){
        return ( 
            <React.Fragment>
                <ToastContainer/>
                <li className="author-card d-flex">
                    <img src={this.state.author?.avatar} alt="Author Avatar"/>
                    <div className="ml-3">
                        <p>
                            <b>
                                {/* Follower/Following Username */}
                                <Link to={"/authorprofile/"+this.props.author}>
                                    {this.state.author?.username}
                                </Link>
                            </b>
                        </p>
                        <div>
                            {/* Follow Btn */}
                            <button type="button" className="btn btn-card-follow" onClick={this.handleFollowBtn}>
                                {this.state.btnText}
                            </button>
                        </div>
                    </div>
                </li>
            </React.Fragment>
        );
    }
}
    
export default AuthorCard;