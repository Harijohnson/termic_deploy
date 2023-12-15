import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import '../index.css'




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

    return ( pages > 1 && (

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
          {/* <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item> */}
          <Pagination.Item
            style={{
              backgroundColor: x + 1 === pages ? 'black' : 'white',
              color: x + 1 === pages ? 'white' : 'black',
            }}
          >
            {x + 1}
          </Pagination.Item>
        </LinkContainer>  
      ))}
    </Pagination>

    )

  )
}

export default Paginate
