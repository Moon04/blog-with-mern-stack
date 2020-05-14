import React from 'react';

const AnonymousSubNav = props => {
    return ( 
        <React.Fragment>

            <a href="/signin" className="btn btn-orange font-weight-bold mr-2" role="button">Sign In</a>
            <a href="/signup" className="btn btn-orange font-weight-bold mr-2" role="button">Sign Up</a>
        
        </React.Fragment>
     );
}
 
export default AnonymousSubNav;