import React,{ useEffect,useState } from 'react'
import { Link,redirect,useLocation,useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import  Loader   from '../components/Loader'
import  Message   from '../components/Message'
import { useDispatch,useSelector } from 'react-redux'
import { registerCompany,companyDetails } from '../actions/productActions'
import  FormContainer   from '../components/FormContainer'
import { LinkContainer } from 'react-router-bootstrap'
import {
  listProducts,
  deleteProduct,
  createProduct,
  getProductsByCompany,
} from '../actions/productActions';
import {  myOrders } from '../actions/orderActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import Paginate from '../components/Paginate';
import { Table, Button, Row, Col } from 'react-bootstrap';

function SellerDetailsScreen() {
    const dispatch = useDispatch()

    const location = useLocation();
    const navigate = useNavigate();

    const userLogin = useSelector(state => state.userLogin)
    const { error,loading,userInfo } = userLogin


    const orderList  = useSelector(state => state.myOrders)
    const { loading:myOrderLoading ,error:myOrderError, orders } = orderList



    useEffect (() => {
        if (!userInfo){
            navigate('/login')
        }else{
            dispatch(companyDetails())
            dispatch(myOrders())
        }
    },[navigate,userInfo,dispatch])

     




    const companyDetailsFromSelector = useSelector(state => state.companyDetails)
    const {loading:conpanyLoading,error:cpmpanyError,companyDetails:{ companyName:companyNameBackend,aboutCompanyBackend:abtCom}={}} = companyDetailsFromSelector


  
     


    const productDetails = useSelector((state) => state.companyProducts)   
    const {companyDetails: { products,page,pages } = {}, loading: productLoading, error: productError } = productDetails;





  
   const productDelete  = useSelector(state => state.productDelete)
   const { loading:loadingDelete ,error:errorDelete, success:successDelete } = productDelete



   const productCreate  = useSelector(state => state.productCreate)
   const { loading:loadingCreate ,error:errorCreate, success:successCreate ,product:createdProduct } = productCreate


    // const products = []
    useEffect(() =>  {
    if(userInfo){
        dispatch(companyDetails())
        dispatch(getProductsByCompany())
        // dispatch(myOrders())  
    }},[dispatch])

    const deleteHandler =(id) => {
        if(window.confirm('Are you sure you want to delete this product ?')){
        // delete product
        dispatch(deleteProduct(id))
        }
      }
      useEffect (() => {


        dispatch({type:PRODUCT_CREATE_RESET})
  

  
  
        if (successCreate){
          navigate(`/product/${createdProduct._id}/edit`)
          // console.log('nothing')
        }else{
          dispatch(listProducts())
        }
      },[dispatch,navigate,userInfo,successDelete,successCreate,createdProduct])
  
  
  const myOrdersHandeler = () => {
    navigate('/seller/myorders')
  }
  
      const createProductHandler = () => {
        //create product
        dispatch(createProduct())

    }

  return (
    
    <>  
    <Link to='/' className='btn btn-light  text-start' style={{backgroundColor:'rgb(80, 117, 104)',color:'white'}}>Go Back</Link>
         { conpanyLoading ?( <Loader />) :
            cpmpanyError ? (<Message variant='danger'>{cpmpanyError}</Message>) :
            
            (<div>
              <Row className='align-items-center'>
                <Col>
                  <h1>Products</h1>
                </Col>
                <Col className='d-flex justify-content-end'>
                  <Button
                        className='btn'
                        style={{ marginRight: '40px', backgroundColor: 'rgb(80, 117, 104)', color: 'white' }}
                        onClick={myOrdersHandeler}
                      >
                         Your Orders{' '}
                              {orders && orders.length > 0 && (
                                <span className="badge bg-danger ml-1 rounded">
                                  {orders.filter(order => !order.isDelivered).length}
                                </span>
                              )}
                    </Button>

                </Col> 
                <Col className='d-flex justify-content-end'>
                  <Button
                    className='btn'
                    style={{ marginRight: '40px' ,backgroundColor:'rgb(80, 117, 104)',color:'white'}}
                    onClick={createProductHandler}
                  >
                    <i className='fas fa-plus'> </i> {'  '} Create Product
                  </Button>
                </Col> 

              </Row>
        
              {loadingDelete && <Loader />}
              {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        
              {loadingCreate && <Loader />}
              {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        
              {conpanyLoading ? (
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
                            <td>
                              <LinkContainer to={`/admin/product/${product._id}/edit`}>
                              <Button variant='light' className='btn-sm'>
                                <i className='fas fa-edit'></i>
                              </Button>
                              </LinkContainer>
                              
                              <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                <i className='fas fa-trash'></i>
                              </Button>
                          </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <Message variant='info'>No products available.</Message>
                  )}
                  {/* <Paginate page={page} pages={pages} isAdmin={false}></Paginate> */}
                </div>
              )}
            </div>
            )}

    </>
  
  )
}

export default SellerDetailsScreen;
