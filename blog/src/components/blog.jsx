import React, { Component } from 'react';

class Blog extends Component {
    
    render() { 
        return ( 
            <React.Fragment>

                <div className="card blog-card mb-4">
                    <img src={this.props.blog.img} className="card-img-top" alt="..." />
                    <div className="row author-area">
                        <div className="d-flex col-6 author">
                        <div className="author-img">
                            <img src="../images/avatar.jpg" className="img-thumbnail" alt="" />
                        </div>
                        <div className="author-name">
                            <a href="author-profile.html"> 
                            Avatar Aang
                            </a>
                        </div>
                        </div>
                        <div className="col-6 follow-author">
                        <a href="#" className="btn-follow auther-follow">Follow</a>
                        </div>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title blog-title"> {this.props.blog.title} </h5>
                        <p className="card-text blog-body"> {this.props.blog.body} </p>
                        <div className="blog-tags">
                            {this.props.blog.tags.map(tag => 
                                <button type="button" className="btn blog-tag" key={tag}>{tag}</button>
                            )}
                        </div>
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default Blog;