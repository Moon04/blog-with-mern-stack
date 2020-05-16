import React, { Component } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import InputLabel from './inputLabel';

const KeyCodes = {
    comma: 188,
    enter: 13,
    SPACE: 32
  };

   
const delimiters = [KeyCodes.comma, KeyCodes.enter, KeyCodes.SPACE];

class BlogForm extends Component {
    state = { 
        errors: {},
        blog: {
            id: 0,
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
            { id: 'Wrrro', text: 'Wrrro' },

         ]
     };

     handleTagDelete = (i) => {
        const { blog } = this.state;
        blog.tags = blog.tags.filter((tag, index) => index !== i);
        this.setState({
         blog
        });
    }
 
    handleTagAddition = (tag) => {
        const { blog } = this.state;
        blog.tags = [...blog.tags, tag]
        this.setState({
         blog
        });
    }

    //  async componentDidMount() {
    //     const id = this.props.match.params.id;
    //     if (id !== "add") {
    //       const { data } = await axios.get("http://localhost:3000/blogs/" + id);
    //       this.setState({ blog: data });
    //     }
    //   }

      handleChange = ({ target }) => {
        //Clone
        const blog = { ...this.state.blog };
        //Edit
        blog[target.id] = target.value;
        //Set Satate
        this.setState({ blog });

        console.log(blog.img);
      };
    
    //   handleSubmit = async e => {
    //     e.preventDefault();
    //     //Make Object to post
    //     const blog = { ...this.state.blog };
    
    //     delete blog.id;
    //     blog.tags.split(",");
    //     if (this.props.match.params.id === "add") {
    //       //CallBackEnd
    //       const { data } = await axios.post(
    //         "http://localhost:3000/blogs",
    //         product
    //       );
    //       //Update State
    //       this.props.onAdd(data);
    //     } else {
    //       //Call BackEnd
    //       const { data } = await axios.put(
    //         `http://localhost:3000/blogs/${this.props.match.params.id}`,
    //         product
    //       );
    //       //State
    //       this.props.onEdit(data);
    //     }
    
    //     //Redirect to Home Page
    //     this.props.history.replace("/home");
    //   };

    render() { 
        return ( 
            <React.Fragment>

                <div className="col-md-4">
                    <div className="d-flex justify-content-center my-5 ml-3 sticky-top">
                        <div className="card blog-form-card">
                        <div className="card-body">
                            <h5 className="card-title blog-form-title">Create New Blog</h5>
                            <form>

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
                                    <textarea className="form-control" id="body" rows={5} defaultValue={""} onChange={this.handleChange} />
                                </div>

                                {/* <div className="form-group">
                                    <label htmlFor="tags">Tags</label>
                                    <input type="text" className="form-control" id="tags" data-role="tagsinput" onChange={this.handleChange} />
                                </div> */}
                                
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
                                        handleDrag={false}
                                        delimiters={delimiters} />
                                </div>
                               
                                <div className="form-group">
                                    <label htmlFor="img">Upload Photo</label>
                                    <input type="file" className="form-control-file" id="img" onChange={this.handleChange} />
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