import React from 'react';
import { Link } from 'react-router-dom';

const AnonymousSubNav = props => {
    return ( 
        <React.Fragment>

            {/* Sign In Button */}
            <Link to="/signin" className="btn btn-orange font-weight-bold mr-2" role="button">Sign In</Link>
            {/* Sign Up Button */}
            <Link to="/signup" className="btn btn-orange font-weight-bold mr-2" role="button">Sign Up</Link>
        
        </React.Fragment>
     );
};
 
export default AnonymousSubNav;