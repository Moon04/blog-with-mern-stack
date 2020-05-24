import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { getFromStorage } from '../utilities/storage';


class Blog extends Component {

    state={
        token: '',
        btnText: '',
        blogAuthor: '',
        blogTags: [],
        profilePath: '/myprofile'
    };

    async componentDidMount(){

        const token = getFromStorage('user_token');
        let blogUserId = this.props.blog.userId;

        if (token) {

            if(this.props.from === "followingsblogs")
            {
                blogUserId = this.props.blog.userId._id;
            }

            const {data} = await axios.get("http://localhost:3000/user/info/"+blogUserId, 
            { headers: {"Authorization" : `${token}`} });

          this.setState({token});
          this.setState({blogAuthor: data.data[0]})

          let followings = this.props.currentAuthor?.followings;
          
          const following = followings?.filter(following => following === blogUserId).length;
          following === 0 ?
          this.setState({btnText: "Follow"}):
          this.setState({btnText: "Unfollow"});
          
        }
        else{
            let author = this.props.authors.filter(auth => auth._id === this.props.blog.blogUserId)[0];
            this.setState({blogAuthor: author});
        }
    
        if(this.props.currentAuthor!==null && this.state.blogAuthor._id !== this.props.currentAuthor._id)
            this.setState({profilePath: "/authorprofile/"+this.state.blogAuthor._id});
    
        else if (this.props.currentAuthor===null) this.setState({profilePath: '#'});

        let tags = [];
        this.props.blog.tags.forEach(tag => {
            tags.push({id: this.generateKey(tag), text: tag});
        });

        this.setState({blogTags: tags});

    }

    //handle follow btn function
    handleFollowBtn = async () =>{

        let currentAuthor = this.props.currentAuthor;
        let userId = '';
        let resData = null;

        if(this.state.btnText === "Follow")
        {
            console.log(currentAuthor);
            //Clone
            const author = this.state.blogAuthor;
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
            const author = this.state.blogAuthor;
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

    generateKey = tag => {
        return `${ tag }_${ Math.random() }`;
    };

    render(){

        return ( 
            <React.Fragment>
                <div className="card blog-card mb-4">
                    {this.state.token && this.props.currentAuthor?._id === this.state.blogAuthor?._id &&
                        <div className="blog-crud">
                            {/* edit blog btn */}
                            <a title="Edit blog" onClick={()=>this.props.handleFormType(this.props.blog._id)}>
                                <i className="fas fa-edit"></i>
                            </a>
                            {/* delete blog btn */}
                            <a title="Delete blog" onClick={()=>this.props.onBlogDelete(this.props.blog)}>
                                <i className="fas fa-trash"></i>
                            </a>
                        </div>
                    }
                    {/* blog image */}
                    <img src={this.props.blog.img} className="card-img-top" alt="Blog" />
                    <div className="row author-area">
                        <div className="d-flex col-6 author">
                            {/* Author Avatar */}
                            <div className="author-img">
                                <img src={this.state.blogAuthor?.avatar} className="img-thumbnail" alt="Author Avatar" />
                            </div>
                            {/* Author Username */}
                            <div className="author-name">
                                <Link to={this.state.profilePath}> 
                                    {this.state.blogAuthor?.username}
                                </Link>
                            </div>
                        </div>
                    { this.state.token && this.props.currentAuthor?._id !== this.state.blogAuthor?._id &&  
                            <div className="col-6 follow-author">
                                {/* follow btn*/}
                                <button type="button" className="btn-follow author-follow" onClick={this.handleFollowBtn}>
                                    {this.state.btnText}
                                </button>
                            </div>
                        }
                    </div>
                    <div className="card-body">
                        <h5 className="card-title blog-title"> 
                            {/* blog title */}
                            {this.props.blog.title} 
                        </h5>
                        <p className="card-text blog-body"> 
                            {/* blog body */}
                            {this.props.blog.body} 
                        </p>
                        <div className="blog-tags">
                            {/* blog tags */}
                            {this.state.blogTags?.map(tag => 
                                    <button type="button" className="btn blog-tag" 
                                        key={tag.id}
                                    >
                                    {tag.text}
                                </button>
                                )
                            }
                        </div>

                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Blog;