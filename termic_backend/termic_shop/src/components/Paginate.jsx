// import { Link } from 'react-router-dom';
// import React from 'react'
// import { Pagination } from 'react-bootstrap'
// import { LinkContainer } from 'react-router-bootstrap'


// function Paginate({pages, page, keyword='',isAdmin=false}) {
  
//     if(keyword){
//         keyword = keyword.split('?keyword=')[1].split('&')[0]
//     }
  

// return pages > 1 && (
//       <Pagination >
//         {[...Array(pages).keys()].map((x) => {
//           const pageNumber = x + 1;
//           const linkProps = {
//             to: !isAdmin
//               ? {
//                   pathname: '/',
//                   search: `?keyword=${keyword}&page=${pageNumber}`,
//                 }
//               : {
//                   pathname: '/admin/productlist',
//                   search: `?keyword=${keyword}&page=${pageNumber}`,
//                 },
//           };
  
//           return (
//             <LinkContainer key={pageNumber} {...linkProps} >
//               <Pagination.Item>
//                 <Link className="page-link"
//                 style={{
//                   backgroundColor: pageNumber === Number(page) ? 'gray' : 'white',
//                   padding: '15px',
//                   color: 'black',
//                   border: 'none',
//                 }}>
//                   {pageNumber}
//                 </Link>
//               </Pagination.Item>
//             </LinkContainer>
//           );
//         })}
//       </Pagination>
//     );
//   }
  
//   export default Paginate;







// // http://127.0.0.1:3000/#/keyword=&page=2
// // http://127.0.0.1:3000/#/?keyword=air&page=1


// // http://127.0.0.1:3000/#/?keyword=&page=2 working


import React from 'react';
import { Link } from 'react-router-dom';

function Paginate({ pages, page, keyword = '', isAdmin = false }) {
  if (keyword) {
    keyword = keyword.split('?keyword=')[1].split('&')[0];
  }

  const generatePageLink = (pageNumber) => {
    return isAdmin
      ? `/admin/productlist?keyword=${keyword}&page=${pageNumber}`
      : `/?keyword=${keyword}&page=${pageNumber}`;
  };

  return pages > 1 && (
    <div className="pagination">
      {[...Array(pages).keys()].map((x) => {
        const pageNumber = x + 1;

        return (
          <Link
            key={pageNumber}
            className={`page-link ${pageNumber === Number(page) ? 'active' : ''}`}
            to={generatePageLink(pageNumber)}
          >
            {pageNumber}
          </Link>
        );
      })}
    </div>
  );
}

export default Paginate;
