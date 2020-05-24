import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class AuthorCard extends Component {

    state={
        btnText: ""
    };

    componentDidMount(){
        // let followings = this.props.currentAuthor.followings;
        // const followingsCount = followings.filter(following => following === this.props.author.id).length;
        // followingsCount === 0?
        // this.setState({btnText: "Follow"}):
        // this.setState({btnText: "Unfollow"});
    }

    handleFollowBtn = async () =>{

        let currenrAuthor = this.props.currenrAuthor;
        let resData = null;

        if(this.state.btnText === "Follow")
        {
            //Clone
            const author = this.props.author;
            //Edit
            currenrAuthor.followings.unshift(author._id);
            //setstate
            this.setState({btnText: "Unfollow"});

            const { data } = await axios.post(
            `http://localhost:3000/user/follow`, author._id
            );
            
            resData = data.data;

        }
        else
        {
            //clone --> edit
            const author = this.props.author;
            const followings = currenrAuthor.followings.filter(following => following !== author.id);
            currenrAuthor.followings = followings;
            this.setState({btnText: "Follow"});

            const { data } = await axios.post(
            `http://localhost:3000/user/unfollow`, author._id
            );

            resData = data.data;
        }

        //call backend
        // const { data } = await axios.put(
        // `http://localhost:3000/authors/${this.props.currentUser.id}`,
        // currenrUser
        // );

        //State
        this.props.handleFollowBtn(resData);
    };

    render(){
        return ( 
            <React.Fragment>
                <li className="author-card d-flex">
                    <img src={this.props.author.avatar} alt="Author Avatar"/>
                    <div className="ml-3">
                        <p>
                            <b>
                                {/* Follower/Following Username */}
                                <Link to={"/authorprofile/"+this.props.author._id}>
                                    {this.props.author.username}
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