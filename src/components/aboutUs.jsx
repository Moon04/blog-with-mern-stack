import React from 'react';

const AboutUs = props => {
    return ( 
        <React.Fragment>

                <div className="d-flex justify-content-center my-5 ml-3 sticky-top">
                    <div className="card about-card">
                        <div className="card-body">
                            <h5 className="card-title about-title">ABOUT US</h5>
                            <p className="card-text blog-body">
                                It's a Blogging website where you can share your blogs with 
                                other bloggers, you can share different interests like music, art, 
                                literature, movies or anything else you're interested in.
                            </p>
                            
                            <h5 className="card-title about-title">HOW IT WORKS!</h5>
                            <p className="card-text blog-body">
                                Now, you only can see latest blogs on the website, 
                                to be able to create blogs, edit or delete them, 
                                following other authors you have to create an account 
                                on the website and it's totally free!
                            </p>
                        </div>
                    </div>
                </div>
            
        </React.Fragment>
     );
};
 
export default AboutUs;