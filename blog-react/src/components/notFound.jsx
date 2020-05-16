import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = props => {
    return ( 
        <React.Fragment>
            <div className="notfound">
                <h1>404</h1>
                <p>Lost in nowhere? Go back to the <Link href="/home">Home Page</Link></p>
            </div>
        </React.Fragment>
     );
}
 
export default NotFound;