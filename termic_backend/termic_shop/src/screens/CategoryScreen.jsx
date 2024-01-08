import React, { useEffect,  } from 'react';
import {Row,Col,} from 'react-bootstrap'
import  Product   from '../components/Product'
import { useDispatch,useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';  
import  Loader   from '../components/Loader'
import  Message   from '../components/Message'
import {  useLocation,Link } from 'react-router-dom';  // Import useLocation
import { listProductsByCategory } from '../actions/productActions';

function CategoryScreen() {

    const dispatch =useDispatch()
    const productCategory  = useSelector(state =>state.productCategory)
    const {error,loading,products  } = productCategory
    const location = useLocation();
    const category = location.pathname.split('/').pop()

    console.log('categorys from function :',category)
    useEffect(() => {
        dispatch(listProductsByCategory(`/${category}`));
      }, [dispatch, category]);

     
      

      return (
        <>
            {/* {console.log("inside the screen ",products)} */}
          
            <Link to='/' className='btn btn-light  text-start' style={{backgroundColor:'lightblue'}}>Go Back</Link>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) :  products && products.products && Array.isArray(products.products) && products.products.length > 0 ?(
            
              <Row xs={2} sm={2} md={3} lg={4} xl={4} className='g-4'>
                {products.products.map((product) => (
                    
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


