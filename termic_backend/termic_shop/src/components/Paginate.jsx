// import React from 'react';
// import { Pagination } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { LinkContainer } from 'react-router-bootstrap'; // Import LinkContainer

// function Paginate({ pages, page, keyword = '', isAdmin = false }) {
//   if (keyword) {
//     keyword = keyword.split('?keyword=')[1].split('&')[0];
//   }

//   return pages > 1 && (
//     <Pagination>
//       {[...Array(pages).keys()].map((x) => {
//         const pageNumber = x + 1;
//         const linkProps = {
//           to: !isAdmin
//             ? {
//                 pathname: '/',
//                 search: `?keyword=${keyword}&page=${pageNumber}`,
//               }
//             : {
//                 pathname: '/admin/productlist',
//                 search: `?keyword=${keyword}&page=${pageNumber}`,
//               },
//         };

//         return (
//           <LinkContainer key={pageNumber} {...linkProps}>
//             <Pagination.Item>
//               <Link className="page-link" style={{ backgroundColor: pageNumber === Number(page) ? 'gray' : 'white', paddingTop: '15px' }}>
//                 {pageNumber}
//               </Link>
//             </Pagination.Item>
//           </LinkContainer>
//         );
//       })}
//     </Pagination>
//   );
// }

// export default Paginate;

// Paginate.jsx
import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

function Paginate({ pages, page, keyword = '', category = '', isAdmin = false }) {
  return pages > 1 && (
    <Pagination>
      {[...Array(pages).keys()].map((x) => {
        const pageNumber = x + 1;

        const queryParams = new URLSearchParams();
        queryParams.set('page', pageNumber);
        if (keyword) queryParams.set('keyword', keyword);
        if (category) queryParams.set('category', category);

        const linkProps = {
          to: !isAdmin ? { pathname: '/', search: `?${queryParams.toString()}` } : { pathname: '/admin/productlist', search: `?${queryParams.toString()}` },
        };

        return (
          <LinkContainer key={pageNumber} {...linkProps}>
            <Pagination.Item active={pageNumber === Number(page)}>
              <Link className="page-link">
                {pageNumber}
              </Link>
            </Pagination.Item>
          </LinkContainer>
        );
      })}
    </Pagination>
  );
}

export default Paginate;
