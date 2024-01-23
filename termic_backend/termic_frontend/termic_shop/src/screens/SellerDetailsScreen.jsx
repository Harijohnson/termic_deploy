import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { companyDetails } from '../actions/productActions';

import { Table, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { LinkContainer } from 'react-router-bootstrap';
import {
  listProducts,
  deleteProduct,
  createProduct,
  getProductsByCompany,
} from '../actions/productActions';
import { useNavigate, useParams } from 'react-router-dom';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import Paginate from '../components/Paginate';
import { useLocation } from 'react-router-dom';

function SellerDetailsScreen() {
    const dispatch = useDispatch()
            
    const userLogin = useSelector((state)=>state.userLogin)
    const { userInfo } = userLogin

    const companyDetailsFromSelector = useSelector((state) => state.companyDetails);
    const {
      error,
      loading,
      companyDetails: { companyName: companyNameBackend } = {},
    } = companyDetailsFromSelector;

    const productDetails = useSelector((state) => state.companyProducts)   
    const {products, loading: productLoading, error: productError } = productDetails;

    console.log(productLoading,productError,products)
    

    console.log("products from backend",products)


    // const products = []
    useEffect(() =>  {
    if(userInfo){
        dispatch(companyDetails())
        dispatch(getProductsByCompany())
    }},[])

   


  return (
    
    <div>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        {/* <Col className='d-flex justify-content-end'>
          <Button
            className='btn'
            style={{ marginRight: '40px' }}
            onClick={createProductHandler}
          >
            <i className='fas fa-plus'> </i> {'  '} Create Product
          </Button>
        </Col> */}
      </Row>

      {/* {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>} */}

{loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div>
          <p>Company: {companyNameBackend}</p>
          {productLoading ? (
            <Loader />
          ) : productError ? (
            <Message variant='danger'>{productError}</Message>
          ) : products &&  products.length > 0 ? (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Brand</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Message variant='info'>No products available.</Message>
          )}
        </div>
      )}
    </div>
  
  )
}

export default SellerDetailsScreen;
