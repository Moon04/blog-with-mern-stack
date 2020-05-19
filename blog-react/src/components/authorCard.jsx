import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class AuthorCard extends Component {

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
    };

    render(){
        return ( 
            <React.Fragment>
                <li className="author-card d-flex">
                    <img src={this.props.author.avatar} alt="Author Avatar"/>
                    <div className="ml-3">
                        <p>
                            <b>
                                <Link to={"/authorprofile/"+this.props.author.id}>
                                    {this.props.author.username}
                                </Link>
                            </b>
                        </p>
                        <div>
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