import React, { useEffect,  } from 'react';
import {Row,Col,} from 'react-bootstrap'
import  Product   from '../components/Product'
import { useDispatch,useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import  Loader   from '../components/Loader'
import  Message   from '../components/Message'
import {  useLocation } from 'react-router-dom';  // Import useLocation

function CategoryScreen() {

    const dispatch =useDispatch()
    const productCategory  = useSelector(state =>state.productCategory)
    const {error,loading,products ,category } = productCategory
    console.log('Product in  State:', productCategory);

    let location = useLocation();
    let keyword = location.search;

    // console.log('Categories:', categories/);
 
    // console.log(keyword)
  useEffect(()=>{
    dispatch(listProducts(keyword))
    
  },[dispatch,keyword])




  return (
    <>
    <h1>Category Screen </h1>
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
              </Row>
              {/* <Paginate page={page} pages={pages}  keyword={keyword}  /> */}
        </div>
        ):(
          <Message variant="info">No products available</Message>
        )
    }
    </>
  )
}

export default CategoryScreen
