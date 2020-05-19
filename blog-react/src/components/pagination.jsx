import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Pagination extends Component {
    state = {  };

    render() { 
        return ( 
            <React.Fragment>
                <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-end">
                        <li className="page-item">
                            <Link className="page-link" to="#">1</Link>
                        </li>
                        <li className="page-item active">
                            <Link className="page-link" to="#">2</Link>
                        </li>
                        <li className="page-item">
                            <Link className="page-link" to="#">3</Link>
                        </li>
                    </ul>
                </nav>
            </React.Fragment>
         );
    }
}
 
export default Pagination;