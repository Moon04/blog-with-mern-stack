import React, { Component } from 'react';
import axios from "axios";

import { getFromStorage } from '../utilities/storage';


import { WithContext as ReactTags } from 'react-tag-input';
import InputLabel from './inputLabel';

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
        errors: {},
        blog: {
            _id: 0,
            authorId:0,
            title: "",
            body: "",
            imgFile: "",
            tags: []
        }  
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

    async componentDidMount() {

        const token = getFromStorage('user_token');
        if (token) 
        {
            this.setState({token});
            const id = this.props.formType;
    
            if (id !== "Add") {
                const { data: blogData } = await axios.get("http://localhost:3000/post/" + id,
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

    //input change
    handleChange = ({ target }) => {
        //Clone
        const blog = { ...this.state.blog };
        //Edit
        if (target.files) {
            blog[target.id] = target.files[0];
        }

        else{
            blog[target.id] = target.value;
        }
        //Set Satate
        this.setState({ blog });
    };

    addNewBlog = async ({title, body, imgFile, tagsArr}) =>{

        let blogId = null;
        let imgFormData = new FormData();

        console.log(tagsArr);


        axios.post('http://localhost:3000/post', 
        {
            title,
            body,
            tags: tagsArr
          },
        { headers: {"Authorization" : `${this.state.token}`} })
        .then(res => {

            blogId = res.data.data._id;
    
            imgFormData.set('postId', blogId);
            imgFormData.append('userFile', imgFile);
            const {data: img} = axios.post('http://localhost:3000/post/upload', 
                imgFormData,
            { headers: {'Authorization' : `${this.state.token}`} })
            .then(res => {
                this.props.onBlogAdd(res.data.data);
            })
        }).catch(err => {
            console.log(err);
        });
        
    }

    editBlog = async ({id, title, body, imgFile, tagsArr}) =>{

        let imgFormData = new FormData();
        console.log(id);

        console.log(imgFile);
        axios.put('http://localhost:3000/post/'+id, 
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
                const {data: img} = axios.post('http://localhost:3000/post/upload', 
                    imgFormData,
                { headers: {'Authorization' : `${this.state.token}`} })
                .then(res => {
                    this.props.onBlogAdd(res.data.data);
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }


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

        console.log(_id);

        tags.forEach(tag => {
            tagsArr.push(tag.text);
        });
        
        if (this.props.formType === "Add") {
            //CallBackEnd
            this.addNewBlog({title, body, imgFile, tagsArr});
            //State
            this.props.onBlogAdd(this.state.blog);
        } 
        
        //edit
        else {
            //Call BackEnd
            let id = _id;
            this.editBlog({id, title, body, imgFile, tagsArr});
            //State
            this.props.onBlogUpdate(this.state.blog);
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
            console.log(this.props.history);
            // this.props.history.replace('/home');

        }

    };


    render() { 
        return ( 
            <React.Fragment>

               <div className={this.props.modal?"modal-dialog":"modal-dialog d-flex justify-content-center my-5 ml-3 sticky-top" }
                    role="document" style={{width: this.props.modal? "60%": "auto"}}>
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
                                    value={this.state.blog.title}
                                    error={this.state.errors.name}
                                    onChange={this.handleChange}
                                />
                            
                                {/* blog body input */}
                                <div className="form-group">
                                    <label htmlFor="body">
                                        Content
                                    </label>
                                    <textarea className="form-control" id="body" rows={5} 
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
                                    <input type="file" className="form-control-file" name="imgFile" id="imgFile" 
                                        // value={this.state.blog.imgFile} 
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