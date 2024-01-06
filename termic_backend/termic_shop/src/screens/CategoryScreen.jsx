import React, { useEffect,  } from 'react';
import {Row,Col,} from 'react-bootstrap'
import  Product   from '../components/Product'
import { useDispatch,useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';  
import  Loader   from '../components/Loader'
import  Message   from '../components/Message'
import {  useLocation } from 'react-router-dom';  // Import useLocation
import { listProductsByCategory } from '../actions/productActions';

function CategoryScreen() {

    const dispatch =useDispatch()
    const productCategory  = useSelector(state =>state.productCategory)
    const {error,loading,products  } = productCategory
    const location = useLocation();
    const category = location.pathname.split('/').pop()


    useEffect(() => {
        dispatch(listProductsByCategory(`/category/${category}`));
      }, [dispatch, category]);

     
      

      return (
        <>
            {/* {console.log("inside the screen ",products)} */}
          <h1>Category Screen: {category}</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : products ?(
            
              <Row xs={2} sm={2} md={3} lg={4} xl={4} className='g-4'>
                {products.map((product) => (
                    
                  <Col key={product._id} className='mb-3'>
                    <Product product={product} />
                    
                  </Col>

                    
                ))}
              </Row>
         
          ) : (
            <Message variant='info'>No products available</Message>
          )}
        </>
      );
    }
    
    export default CategoryScreen;


