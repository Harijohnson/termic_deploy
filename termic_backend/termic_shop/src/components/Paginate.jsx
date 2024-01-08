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


import React from 'react';
import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

function Paginate({ pages, page, keyword = '', category = '', isAdmin = false }) {
  if (keyword) {
    keyword = keyword.split('?keyword=')[1].split('&')[0];
  }

  return pages > 1 && (
    <Pagination>
      {[...Array(pages).keys()].map((x) => {
        const pageNumber = x + 1;
        const linkProps = {
          to: !isAdmin
            ? {
                pathname: '/',
                search: `?keyword=${keyword}&category=${category}&page=${pageNumber}`,
              }
            : {
                pathname: '/admin/productlist',
                search: `?keyword=${keyword}&category=${category}&page=${pageNumber}`,
              },
        };

        return (
          <LinkContainer key={pageNumber} {...linkProps}>
            <Pagination.Item>
              <Link className="page-link" style={{ backgroundColor: pageNumber === Number(page) ? 'gray' : 'white', paddingTop: '15px' }}>
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
