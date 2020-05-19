import React, { Component } from 'react';
import axios from "axios";

import { WithContext as ReactTags } from 'react-tag-input';
import InputLabel from './inputLabel';
import { Redirect } from 'react-router-dom';

//tags delimiters codes
const KeyCodes = {
    comma: 188,
    enter: 13,
    SPACE: 32
  };

//delimiters array   
const delimiters = [KeyCodes.comma, KeyCodes.enter, KeyCodes.SPACE];

class BlogForm extends Component {

    //blog form state
    state = { 
        errors: {},
        blog: {
            id: 0,
            authorId:0,
            title: "",
            body: "",
            tags: [],
            img: ""
        },
        suggestions: [
            { id: 'Art', text: 'Art' },
            { id: 'Writting', text: 'Writting' },
            { id: 'Photography', text: 'Photography' },
            { id: 'Technology', text: 'Technology' },
            { id: 'Color', text: 'Color' },
            { id: 'Wrrro', text: 'Wrrro' }
         ]
     };

    //delete tag
    handleTagDelete = (i) => {
        const { blog } = this.state;
        blog.tags = blog.tags.filter((tag, index) => index !== i);
        this.setState({
            blog
        });
    }

    //add tag
    handleTagAddition = (tag) => {
        const { blog } = this.state;
        blog.tags = [...blog.tags, tag]
        this.setState({
         blog
        });
    }

    //drag tags
    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.blog.tags];
        const newTags = tags.slice();
 
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
 
        let blog = this.state.blog;
        blog.tags = newTags

        // re-render
        this.setState({ blog });
    }

    async componentDidMount() {
        const id = this.props.formType;
        console.log(id);

        if (id !== "Add") {
            const { data } = await axios.get("http://localhost:3000/blogs/" + id);
            console.log(data);

            delete data.img;
            this.setState({ blog: data });
        }
    }

    //input change
    handleChange = ({ target }) => {
        //Clone
        const blog = { ...this.state.blog };
        //Edit
        blog[target.id] = target.value;
        //Set Satate
        this.setState({ blog });
    };

    //submit form
    handleSubmit = async e => {
        e.preventDefault();
        //Make Object to post
        const blog = { ...this.state.blog };

        blog.authorId = this.props.currentUser.id;
        if (this.props.formType === "Add") {
            delete blog.id;
            //CallBackEnd
            const { data } = await axios.post(
            "http://localhost:3000/blogs",
            blog
            );
            //Update State
            this.props.onBlogAdd(data);
        } 
        
        else {
            //Call BackEnd
            const { data } = await axios.put(
            `http://localhost:3000/blogs/${blog.id}`,
            blog
            );
            //State
            this.props.onBlogUpdate(data);
        }

        if(this.props.modal)
        {
            this.props.closeForm();
        }
        else{
            let blogState = {
                id: 0,
                authorId:0,
                title: "",
                body: "",
                tags: [],
                img: ""
            };

            this.setState({blog: blogState});
        }

    };

    render() { 
        return ( 
            <React.Fragment>
               <div className={this.props.modal?"modal-dialog":"modal-dialog d-flex justify-content-center my-5 ml-3 sticky-top" }
                    role="document" style={{width: this.props.modal? "60%": "auto"}}>
                    <form onSubmit={this.handleSubmit} className="w-100">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    {this.props.formType === "Add"? "Create New": "Edit"} Blog
                                </h5>
                                {this.props.modal && 
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.closeForm}>
                                        <span aria-hidden="true">×</span>
                                    </button>
                                }
                            </div>
                            <div className="modal-body">
                                <InputLabel
                                    name="title"
                                    label="Title"
                                    type="text"
                                    value={this.state.blog.title}
                                    error={this.state.errors.name}
                                    onChange={this.handleChange}
                                />
                            
                                <div className="form-group">
                                    <label htmlFor="body">
                                        Content
                                    </label>
                                    <textarea className="form-control" id="body" rows={5} 
                                        value={this.state.blog.body} 
                                        onChange={this.handleChange} 
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="tags">
                                        Tags
                                    </label>
                                    <ReactTags 
                                        name="tags"
                                        id="tags"
                                        tags={this.state.blog.tags}
                                        suggestions={this.state.suggestions}
                                        placeholder="Add tags for your blog"
                                        autofocus={false}
                                        autocomplete={true}
                                        allowUnique={true}
                                        handleDelete={this.handleTagDelete}
                                        handleAddition={this.handleTagAddition}
                                        handleDrag={this.handleDrag}
                                        delimiters={delimiters} />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="img">
                                        Upload Photo
                                    </label>
                                    <input type="file" className="form-control-file" id="img" 
                                        value={this.state.blog.img} 
                                        onChange={this.handleChange} 
                                    />
                                </div>                     
                                                    
                            </div>
                            <div className="modal-footer">
                                {this.props.modal &&
                                    <button type="button" className="btn btn-secondary" onClick={this.props.closeForm}>
                                        Close
                                    </button>
                                }
                                <button type="submit" className="btn btn-publish" style={{padding:"7px", margin:"0"}}>
                                    Publish
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                    {/* <div className="d-flex justify-content-center my-5 ml-3 sticky-top">
                        <div className="card blog-form-card">
                        <div className="card-body">
                            <h5 className="card-title blog-form-title">Create New Blog</h5>
                            <form onSubmit={this.handleSubmit}>

                                <InputLabel
                                    name="title"
                                    label="Title"
                                    type="text"
                                    value={this.state.blog.title}
                                    error={this.state.errors.name}
                                    onChange={this.handleChange}
                                />
                                
                                <div className="form-group">
                                    <label htmlFor="body">Content</label>
                                    <textarea className="form-control" id="body" rows={5} defaultValue={this.state.blog.body} onChange={this.handleChange} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="tags">Tags</label>
                                    <ReactTags 
                                        name="tags"
                                        id="tags"
                                        tags={this.state.blog.tags}
                                        suggestions={this.state.suggestions}
                                        placeholder="Add tags for your blog"
                                        autofocus={false}
                                        autocomplete={true}
                                        allowUnique={true}
                                        handleDelete={this.handleTagDelete}
                                        handleAddition={this.handleTagAddition}
                                        handleDrag={this.handleDrag}
                                        delimiters={delimiters} />
                                </div>
                               
                                <div className="form-group">
                                    <label htmlFor="img">Upload Photo</label>
                                    <input type="file" className="form-control-file" id="img" value={this.state.blog.img} onChange={this.handleChange} />
                                </div>

                                <button type="submit" className="btn btn-publish">Publish</button>
                                
                            </form>
                        </div>
                        </div>
                    </div> */}

            </React.Fragment>
         );
    }
}
 
export default BlogForm;