import React from 'react'
import { Pagination, } from 'react-bootstrap'
import { LinkContainer, } from 'react-router-bootstrap'
import { Link } from 'react-router-dom';



function Paginate({pages, page, keyword='',isAdmin=false}) {
  
    
    
    if(keyword){
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }


    return pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => {
          const pageNumber = x + 1;
  
          const linkProps = {
            to: !isAdmin
              ? {
                pathname: '/',
                search: `?keyword=${keyword}&page=${pageNumber}`,
              }
              : {
                pathname: '/admin/productlist',
                search: `?keyword=${keyword}&page=${pageNumber}`,
              },
            style: {
              backgroundColor: pageNumber === Number(page) ? 'gray' : 'white',
            },
          };
  
          return (
            <Pagination.Item key={pageNumber}>
              <Link {...linkProps} className="page-link">
                {pageNumber}
              </Link>
            </Pagination.Item>
          );
        })}
      </Pagination>
    )
}

export default Paginate
