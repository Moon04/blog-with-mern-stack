import React from 'react';
import Navbar from './navbar';
import AuthorBanner from './authorBanner';
import AuthorInfo from './authorInfo';
import Pagination from './pagination';
import AboutMe from './aboutMe';
// import Blog from './blog';

const AuthorProfile = props => {

    let author = null;
    // let blogs = props.blogs;
    console.log(props.authors);
    console.log(props.blogs);

    
    if(props.currentUser !== null && props.template === "myprofile" )
    {
        author = props.authors.filter(a => a.id === props.currentUser.id)[0];
        // blogs = props.blogs.filter(blog => blog.authorId === author.id);
    }
    else{
        console.log(props.authors);
        console.log(props.match.params.id);
        author = props.authors.filter(a => a.id === Number(props.match.params.id))[0];
        // blogs = props.blogs.filter(blog => blog.authorId === author.id);
    }

    // console.log(author);


    // handleBlogDelete = async blog => {
    //     //Copy Orignal Data
    //     const orignalData = [...this.props.blogs];
    
    //     //State
    //     this.props.onBlogDelete(blog);
    
    //     try {
    //       //Call BackEnd
    //       const { data } = await axios.delete(
    //         `http://localhost:3000/blogs/${blog.id}`
    //       );
    //     } catch (error) {
    //       //Print Error
    //       if (error.response && error.response.status === 404) {
    //         toast("Blog already Deleted");
    //       } else {
    //         toast("Something went wrong!");
    //       }
    //       //Restore Data
    //       this.props.onRestore(orignalData);
    //     }
    //   };


    return ( 
        <React.Fragment>
                
            {/* Navbar */}
            <Navbar/>

            {/* Author Banner */}
            <AuthorBanner author={author}/>

            {/* Author Info ==> Author<>Mine */}
            <AuthorInfo author={author} currentUser={props.currentUser}/>

            {/* Profile Container */}
            <div className="container-fluid">
                <div className="row mx-5">

                    {/* About Me */}
                    <AboutMe about={author.about}/>

                    {/* Author Blogs */}
                    <div className="col-md-8">
                        <div className="d-flex align-items-center my-5 flex-column">

                            {/* Blog Card */}
                            {/* {blogs.map(blog => 
                                <Blog 
                                    key={blog.id} 
                                    blog={blog} 
                                    authors={props.authors} 
                                    currentUser={props.currentUser}
                            />)} */}

                        </div>
                        
                        {/* pagination */}
                        <Pagination/>
                    </div>


                </div>
            </div>


        </React.Fragment>
     );
}
 
export default AuthorProfile;