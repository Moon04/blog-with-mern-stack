import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = props => {

    let pages = [];

    for (let index = 1; index <= props.pagesCount; index++) {
      pages.push(index);
    }

    return (
      <nav aria-label="...">
        <ul className="pagination floatRight" style={{float: "right"}}>
          {pages.map(page => (
            <li
              key={page}
              className={
                props.activePage === page ? "page-item active-page" : "page-item"
              }
            >
              <Link
                onClick={() => props.onPageChange(page)}
                className="page-link page"
                to="#"
              >
                {page}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  
 
export default Pagination;