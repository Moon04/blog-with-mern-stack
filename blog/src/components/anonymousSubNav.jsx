import React, { Component } from 'react';

class AnonymousSubNav extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <a href="signin.html" className="btn btn-orange font-weight-bold mr-2" role="button">Sign In</a>
                <a href="signup.html" className="btn btn-orange font-weight-bold mr-2" role="button">Sign Up</a>
            </React.Fragment>
         );
    }
}
 
export default AnonymousSubNav;