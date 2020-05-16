import React from 'react';

const Blog = props => {
    return ( 
        <React.Fragment>

            <div className="card blog-card mb-4">
                <img src={props.blog.img} className="card-img-top" alt="..." />
                <div className="row author-area">
                    <div className="d-flex col-6 author">
                    <div className="author-img">
                        <img src="../images/avatar.jpg" className="img-thumbnail" alt="" />
                    </div>
                    <div className="author-name">
                        <a href="/authorprofile"> 
                        Avatar Aang
                        </a>
                    </div>
                    </div>
                    <div className="col-6 follow-author">
                    <a href="#" className="btn-follow author-follow">Follow</a>
                    </div>
                </div>
                <div className="card-body">
                    <h5 className="card-title blog-title"> {props.blog.title} </h5>
                    <p className="card-text blog-body"> {props.blog.body} </p>
                    <div className="blog-tags">
                        {props.blog.tags.map(tag => 
                            <button type="button" className="btn blog-tag" key={tag}>{tag}</button>
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
     );
}
 
export default Blog;