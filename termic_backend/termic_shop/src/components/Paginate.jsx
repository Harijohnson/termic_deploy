import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'





function Paginate({pages, page, keyword='',isAdmin=false}) {
  
    
    
    if(keyword){
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }
  
    let search = `?keyword=${keyword}&pages=${page}`;

    if (isAdmin) {
      search = `/admin/productlist/${search}`;
    } else {
      search = `/${search}`;
    }
  
    // console.log(keyword)
    return ( pages >1 && (
        // <Pagination>
        //     {
        //         [
        //             ...Array(pages).keys()
        //         ].map((x) =>(
        //             <LinkContainer
        //              key ={x+1}
        //              to={ !isAdmin 
        //                 ? `/?keyword=${keyword}&pages=${x + 1}` 
        //                  : `/admin/productlist/?keyword=${keyword}&pages=${x + 1}`}>


        //                 <Pagination.Item  active={ x + 1  === page}   >  {x+1}</Pagination.Item>
        //             </LinkContainer>



        //
        //         ))
        //     }
        // </Pagination>
        <Pagination>
        {
        [
            ...Array(pages).keys()
        ].map((x) => (
        <LinkContainer
          key={x + 1}
          to={{
            pathname: '/',
            search: `?keyword=${keyword}&pages=${x + 1}`,
          }}
        >
          <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>

    )

  )
}

export default Paginate
