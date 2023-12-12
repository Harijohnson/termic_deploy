import React,{useEffect} from 'react'
import {Row,Col} from 'react-bootstrap'
import  Product   from '../components/Product'
import { useDispatch,useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import  Loader   from '../components/Loader'
import  Message   from '../components/Message'
import { useLocation } from 'react-router-dom';  // Import useLocation
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'



function HomeScreen() {
    const dispatch =useDispatch()
    const productList  = useSelector(state =>state.productList)
    const {error,loading,products , page ,pages} =productList



    let location = useLocation();
    let keyword = location.search;
  


    // console.log(keyword)
  useEffect(()=>{
    dispatch(listProducts(keyword))
    
  },[dispatch,keyword])

  return (
    <div>
      { !keyword && <ProductCarousel /> }
      <h1>Latest Produtcts</h1>
      {
        loading ? <Loader /> 
        : error ? <Message  variant='danger'>{error}</Message> 
        : products ? (

          <div>
              <Row>
                {products.map((product) => (
                    <Col key={ product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}  />
                    </Col>
                ))}
              </Row>
              <Paginate page={page} pages={pages}  keyword={keyword}  />
        </div>
        ):(
          <Message variant="info">No products available</Message>
        )
    }
      
    </div>
  )
}

export default HomeScreen
