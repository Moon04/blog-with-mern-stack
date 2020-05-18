import React from 'react';
import { Link } from 'react-router-dom';

const Blog = props => {

    console.log(props.authors);
    const author = props.authors.filter(author => author.id === props.blog.authorId)[0];
    let profile = "/myprofile";
    // console.log(author.id);
    if(props.currentUser!==null && author.id !== props.currentUser.id)
    {
        profile = "/authorprofile/"+author.id;
        // console.log(props.currentUser.id);
    }

    else if (props.currentUser===null){
        profile = "#";
    }
    
    return ( 
        <React.Fragment>

            <div className="card blog-card mb-4">
                <img src={props.blog.img} className="card-img-top" alt="..." />
                <div className="row author-area">
                    <div className="d-flex col-6 author">
                    <div className="author-img">
                        <img src={author.avatar} className="img-thumbnail" alt="" />
                    </div>
                    <div className="author-name">
                        <Link to={profile} disabled> 
                            {author.username}
                        </Link>
                    </div>
                    </div>
                   { props.currentUser !==null && props.currentUser.id !== author.id &&  
                    <div className="col-6 follow-author">
                        <button type="button" className="btn-follow author-follow">Follow</button>
                    </div>}
                </div>
                <div className="card-body">
                    <h5 className="card-title blog-title"> {props.blog.title} </h5>
                    <p className="card-text blog-body"> {props.blog.body} </p>
                    <div className="blog-tags">
                        {props.blog.tags.map(tag => 
                            <button type="button" className="btn blog-tag" key={tag.text}>{tag.text}</button>
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
     );
}
 
export default Blog;