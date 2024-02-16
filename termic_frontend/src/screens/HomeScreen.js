import React, { useEffect, useState, } from 'react';
import {Row,Col,Dropdown,Button} from 'react-bootstrap'
import  Product   from '../components/Product'
import { useDispatch,useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import  Loader   from '../components/Loader'
import  Message   from '../components/Message'
import { Link, useLocation,useNavigate } from 'react-router-dom';  // Import useLocation
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'




function HomeScreen() {
    const dispatch =useDispatch()
    const productList  = useSelector(state =>state.productList)
    const {error,loading,products , page ,pages,  } = productList
    // console.log('Product page and pages  :', page,pages);
  
    const location = useLocation();
    const keyword = location.search;
    
    const navigate = useNavigate();


    const userLogin  = useSelector(state => state.userLogin)  //get the user info 
    const { userInfo } = userLogin

    
    // console.log('Categories:', categories/);
 
    // console.log(keyword)
    useEffect(()=>{
      dispatch(listProducts(keyword))
      
    },[dispatch,keyword])


 
  return (
    <div className="container">

      <Message variant='danger'>This Websit for educational purposes only not actual products are listed here</Message>
      { !keyword && <ProductCarousel maxProducts={5} /> }
      <h1 className="my-4">Latest Produtcts </h1>
      {
        loading ? <Loader /> 
        : error ? <Message  variant='danger'>{error}</Message> 
        : products ? (

          <div>
              <Row  xs={2} sm={2} md={3} lg={4} xl={4} className="g-4">
                {products.map((product) => (
                    <Col key={ product._id} className="mb-3" >
                        <Product product={product}  />
                    </Col>
                ))}
              
              
              
        <Paginate page={page} pages={pages}  keyword={keyword ? `?keyword=${keyword}` : '' }  />
        </Row>  
        
        </div>
        
        ):(
          <Message variant="info">No products available</Message>
        )
    }
      
    </div>
  )
}

export default HomeScreen
