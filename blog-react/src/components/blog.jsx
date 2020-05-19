import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Blog extends Component {

    state={
        btnText: ""
    };

    componentDidMount(){

        if(this.props.currentUser !== null)
        {
            let followings = this.props.currentUser.followings;
            const following = followings.filter(following => following === this.props.blog.authorId).length;
            following === 0?
            this.setState({btnText: "Follow"}):
            this.setState({btnText: "Unfollow"});
        }
    }

    handleFollowBtn = async () =>{

        let currenrUser = this.props.currentUser;

        if(this.state.btnText === "Follow")
        {
            //Clone
            const author = this.props.blog.authorId;
            //Edit
            currenrUser.followings.unshift(author);
            //setstate
            this.setState({btnText: "Unfollow"});
        }
        else
        {
            //clone --> edit
            const author = this.props.blog.authorId;
            const followings = currenrUser.followings.filter(following => following !== author);
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

        const author = this.props.authors.filter(author => author.id === this.props.blog.authorId)[0];

        let profile = "/myprofile";

        if(this.props.currentUser!==null && author.id !== this.props.currentUser.id)
            profile = "/authorprofile/"+author.id;

        else if (this.props.currentUser===null) profile = "#";
        
        return ( 
            <React.Fragment>
                <div className="card blog-card mb-4">
                    {this.props.currentUser!==null && this.props.currentUser.id === author.id &&
                        <div className="blog-crud">
                            <a title="edit blog" onClick={()=>this.props.handleFormType(this.props.blog.id)}>
                                <i className="fas fa-edit"></i>
                            </a>
                            <a title="delete blog" onClick={()=>this.props.onBlogDelete(this.props.blog)}>
                                <i className="fas fa-trash"></i>
                            </a>
                        </div>
                    }
                    <img src={this.props.blog.img} className="card-img-top" alt="Blog" />
                    <div className="row author-area">
                        <div className="d-flex col-6 author">
                            <div className="author-img">
                                <img src={author.avatar} className="img-thumbnail" alt="Author Avatar" />
                            </div>
                            <div className="author-name">
                                <Link to={profile}> 
                                    {author.username}
                                </Link>
                            </div>
                        </div>
                    { this.props.currentUser !==null && this.props.currentUser.id !== author.id &&  
                            <div className="col-6 follow-author">
                                <button type="button" className="btn-follow author-follow" onClick={this.handleFollowBtn}>
                                    {this.state.btnText}
                                </button>
                            </div>
                        }
                    </div>
                    <div className="card-body">
                        <h5 className="card-title blog-title"> 
                            {this.props.blog.title} 
                        </h5>
                        <p className="card-text blog-body"> 
                            {this.props.blog.body} 
                        </p>
                        <div className="blog-tags">
                            {this.props.blog.tags.map(tag => 
                                <button type="button" className="btn blog-tag" key={tag.text}>
                                    {tag.text}
                                </button>)
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Blog;