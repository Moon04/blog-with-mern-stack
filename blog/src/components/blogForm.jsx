import React, { Component } from 'react';

class BlogForm extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>

                <div className="col-md-4">
                    <div className="d-flex justify-content-center my-5 ml-3 sticky-top">
                        <div className="card blog-form-card">
                        <div className="card-body">
                            <h5 className="card-title blog-form-title">Create New Blog</h5>
                            <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" className="form-control" id="title" aria-describedby="title" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="body">Content</label>
                                <textarea className="form-control" id="body" rows={3} defaultValue={""} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tags">Tags</label>
                                <input type="text" className="form-control" id="Tags" aria-describedby="Tags" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="img">Upload Photo</label>
                                <input type="file" className="form-control-file" id="img" />
                            </div>
                            <a href="#" className="btn btn-publish">Publish</a>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
         );
    }
}
 
export default BlogForm;