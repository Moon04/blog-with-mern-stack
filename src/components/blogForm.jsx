import React, { Component } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import InputLabel from './inputLabel';
import { getFromStorage } from '../utilities/storage';

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
        token: '',
        blog: {
            _id: 0,
            authorId:0,
            title: "",
            body: "",
            imgFile: "",
            tags: []
        }  
    };

    async componentDidMount() {

        const token = getFromStorage('user_token');
        if (token) 
        {
            this.setState({token});
            const id = this.props.formType;
    
            if (id !== "Add") {
                const { data: blogData } = await axios.get(process.env.REACT_APP_BACKEND_URL+"/post/" + id,
                { headers: {"Authorization" : `${token}`} });

                let tags = [];

                blogData.data.tags.forEach(tag => {
                    tags.push({id: tag, text: tag});
                });

                console.log(blogData.data);

                blogData.data.tags = tags;
                this.setState({blog: blogData.data})
            }
        }

    }
    
     //add tag
     handleTagAddition = (tag) => {
        const { blog } = this.state;
        blog.tags = [...blog.tags, tag];
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

    //delete tag
    handleTagDelete = (i) => {
        const { blog } = this.state;
        blog.tags = blog.tags.filter((tag, index) => index !== i);
        this.setState({
            blog
        });
    }

    //input change
    handleChange = ({ target }) => {
        //Clone
        const blog = { ...this.state.blog };
        const errors = { ...this.state.errors };

        //Edit
        if (target.files) {
            blog[target.id] = target.files[0];
        }
        else{
            blog[target.id] = target.value;
        }
        //Set Satate
        this.setState({ blog, errors });
    };
   
    //add blog backend
    addNewBlog = async ({title, body, imgFile, tagsArr}) =>{

        let blogId = null;
        let imgFormData = new FormData();

        axios.post(process.env.REACT_APP_BACKEND_URL+'/post', 
        {
            title,
            body,
            tags: tagsArr
        },
        { headers: {"Authorization" : `${this.state.token}`} })
        .then(res => {

           if (imgFile) {
            blogId = res.data.data._id;
    
            imgFormData.set('postId', blogId);
            imgFormData.append('userFile', imgFile);
            const {data: img} = axios.post(process.env.REACT_APP_BACKEND_URL+'/post/upload', 
                imgFormData,
            { headers: {'Authorization' : `${this.state.token}`} })
            .then(res => {
                this.props.onBlogAdd(res.data.data);
            }).catch(err=>{
                toast("Connection Error, Upload Image Again", {type: "error", position: "top-left"})
            });
           }
           else{
               this.props.onBlogAdd(res.data.data);
           }
        }).catch(err => {
            if (err.response.status === 422) {
                toast(err.response.data, {type: "error", position: "top-left"})
            }
            else toast("Connection Error", {type: "error", position: "top-left"})
        });
        
    };

    //edit blog backend
    editBlog = async ({id, title, body, imgFile, tagsArr}) =>{

        let imgFormData = new FormData();

        axios.put(process.env.REACT_APP_BACKEND_URL+'/post/'+id, 
        {
            title,
            body,
            tags: tagsArr
        },
        { headers: {"Authorization" : `${this.state.token}`} })
        .then(res => {    
            if(imgFile)
            {
                imgFormData.set('postId', id);
                imgFormData.append('userFile', imgFile);
                const {data: img} = axios.post(process.env.REACT_APP_BACKEND_URL+'/post/upload', 
                    imgFormData,
                { headers: {'Authorization' : `${this.state.token}`} })
                .then(res => {
                    this.props.onBlogUpdate(res.data.data);
                }).catch(err=>{
                    toast("Connection Error, Upload Image Again", {type: "error", position: "top-left"})
                });
            }
            else{
                this.props.onBlogUpdate(res.data.data);
            }
        }).catch(err => {
            if (err.response.status === 422) {
                toast(err.response.data, {type: "error", position: "top-left"})
            }
            else toast("Connection Error", {type: "error", position: "top-left"})
        });
    };
    
    //handle form submit
    handleSubmit = e => {
        e.preventDefault();
 
        let tagsArr = [];
        
        const {
            _id,
            title,
            body,
            imgFile,
            tags
        } = this.state.blog;

        tags.forEach(tag => {
            tagsArr.push(tag.text);
        });
        
        //add
        if (this.props.formType === "Add") {
            //CallBackEnd
            this.addNewBlog({title, body, imgFile, tagsArr});
        } 
        
        //edit
        else {
            //Call BackEnd
            let id = _id;
            this.editBlog({id, title, body, imgFile, tagsArr});
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
                imgFile: ""
            };

            this.setState({blog: blogState});
        }

    };

    render() { 
        return ( 
            <React.Fragment>

               <div className={this.props.modal?"modal-dialog":"modal-dialog d-flex justify-content-center my-5 ml-3 sticky-top" }
                    role="document" style={{width: this.props.modal? "60%": "auto"}}>
                    <ToastContainer />
                        {/* blog form */}
                    <form onSubmit={this.handleSubmit} className="w-100">
                        <div className="modal-content">
                            <div className="modal-header">
                                {/* blog form title */}
                                <h5 className="modal-title" id="exampleModalLabel">
                                    {this.props.formType === "Add"? "Create New": "Edit"} Blog
                                </h5>
                                {this.props.modal && 
                                    // close blog form modal btn
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.closeForm}>
                                        <span aria-hidden="true">×</span>
                                    </button>
                                }
                            </div>
                            <div className="modal-body">

                                {/* blog title input */}
                                <InputLabel
                                    name="title"
                                    label="Title"
                                    type="text"
                                    required={true}
                                    value={this.state.blog.title}
                                    onChange={this.handleChange}
                                />
                            
                                {/* blog body input */}
                                <div className="form-group">
                                    <label htmlFor="body">
                                        Content
                                    </label>
                                    <textarea className="form-control" id="body" rows={5} 
                                        required={true}
                                        value={this.state.blog.body} 
                                        onChange={this.handleChange} 
                                    />
                                </div>

                                {/* blog tags input */}
                                <div className="form-group">
                                    <label htmlFor="tags">
                                        Tags
                                    </label>
                                    <ReactTags 
                                        name="tags"
                                        id="tags"
                                        tags={this.state.blog.tags}
                                        // suggestions={this.state.suggestions}
                                        placeholder="Add tags for your blog"
                                        autofocus={false}
                                        autocomplete={true}
                                        allowUnique={true}
                                        handleDelete={this.handleTagDelete}
                                        handleAddition={this.handleTagAddition}
                                        handleDrag={this.handleDrag}
                                        delimiters={delimiters} />
                                </div>
                                
                                {/* blog image input */}
                                <div className="form-group">
                                    <label htmlFor="imgFile">
                                        Upload Photo
                                    </label>
                                    <input type="file" className="form-control-file" 
                                        name="imgFile" id="imgFile"
                                        onChange={this.handleChange} 
                                    />
                                </div>                                       
                                                    
                            </div>
                            <div className="modal-footer">
                                {this.props.modal &&
                                    // close blog form modal btn
                                    <button type="button" className="btn btn-secondary" onClick={this.props.closeForm}>
                                        Close
                                    </button>
                                }
                                {/* publish blog btn */}
                                <button type="submit" className="btn btn-publish" style={{padding:"7px", margin:"0"}}>
                                    Publish
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment>
         );
    }
}
 
export default BlogForm;