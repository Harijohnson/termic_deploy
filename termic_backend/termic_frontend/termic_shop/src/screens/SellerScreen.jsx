// import React,{ useEffect,useState } from 'react'
// import { Link,redirect,useLocation,useNavigate } from 'react-router-dom'
// import { Form,Button,Col,Row } from 'react-bootstrap'
// import  Loader   from '../components/Loader'
// import  Message   from '../components/Message'
// import { useDispatch,useSelector } from 'react-redux'
// import { registerCompany,companyDetails } from '../actions/productActions'
// import  FormContainer   from '../components/FormContainer'
// function SellerScreen() {
    
    
//     const dispatch = useDispatch()

//     const location = useLocation();
//     const navigate = useNavigate();

//     const userLogin = useSelector(state => state.userLogin)
//     const { error,loading,userInfo } = userLogin






//     useEffect (() => {
//         if (!userInfo){
//             navigate('/login')
//         }else{
//             dispatch(companyDetails())
//         }
//     },[navigate,userInfo,dispatch])

     

//     const [companyName,setCompanyName] = useState('')
//     const [aboutCompany,setAboutCompany] = useState('')

    





//     const companyDetailsFromSelector = useSelector(state => state.companyDetails)
//     const {companyDetails:{ companyName:companyNameBackend,aboutCompanyBackend:abtCom}={}} = companyDetailsFromSelector



//     const submitHandeler = ((e)=>
//     {
//         e.preventDefault()
//         dispatch(registerCompany(companyName,aboutCompany,))
//         const success = true 

//         if (success){
//             navigate('seller/details')
//         }

//     })
//   return (
//     <>  
//          { !companyNameBackend ? (
//               <FormContainer>
//                 <h1>Create Company</h1>

//                 {error && <Message variant='danger'>{error}</Message>}
//                   {loading && <Loader />}
//                 <Form onSubmit={ submitHandeler }>
//                   <Form.Group controlId='companyname'>
//                       <Form.Label>
//                           Company Name
//                       </Form.Label>
//                       <Form.Control 
//                       type='text'
//                       placeholder='Company Name'
//                       value={companyName}
//                       onChange={(e)=>setCompanyName(e.target.value)}>

//                       </Form.Control>
//                   </Form.Group>


//                   <Form.Group controlId='aboutcompany'>
//                       <Form.Label>
//                           About Company
//                       </Form.Label>
//                       <Form.Control 
//                       type='textarea'
//                       placeholder='About Company'
//                       value={aboutCompany}
//                       onChange={(e)=>setAboutCompany(e.target.value)}>

//                       </Form.Control>
//                   </Form.Group>

//                   <Button 
//                   type='submit'
//                   variant='primary' >
//                       Submit
//                   </Button>


//                 </Form>

//                 {/* <Row className = 'py-3'>
//                   <Col>
//                   New Customer ? <Link to ={redirect ? `/register?redirect = ${redirect}` : '/register'}>
//                       Register
//                   </Link>
//                   </Col>
//                 </Row> */}
//               </FormContainer>
//         )
//         :
//         (
//              <>
//             {navigate('/seller/details')}
//             </>
//              )}
//     </>
 
//     )
// }


// export default SellerScreen

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux';
import { registerCompany, companyDetails } from '../actions/productActions';
import FormContainer from '../components/FormContainer';

function SellerScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const companyDetailsFromSelector = useSelector((state) => state.companyDetails);
  const { loading:companyLoading,error:companyError,companyDetails: { companyName: companyNameBackend, aboutCompanyBackend: abtCom } = {} } = companyDetailsFromSelector;
  useEffect(() => {
    if (companyNameBackend) {
      navigate('/seller/details');
    }
  }, [companyNameBackend, navigate]);

  useEffect(() => {
    
      dispatch(companyDetails());
    }
  , [navigate, userInfo, dispatch]);

  const [companyName, setCompanyName] = useState('');
  const [aboutCompany, setAboutCompany] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerCompany(companyName, aboutCompany)).then((success) => {
      if (success) {
        navigate('/seller/details');
      }
    });
  };

  return (


    <div>
   

      <FormContainer>
        <h1>Create Company</h1>
        {loading ?( <Loader />) :
            error ? (<Message variant='danger'>{error}</Message>)
            :(
       
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='companyname'>
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Company Name'
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='aboutcompany'>
            <Form.Label>About Company</Form.Label>
            <Form.Control
              type='textarea'
              placeholder='About Company'
              value={aboutCompany}
              onChange={(e) => setAboutCompany(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Submit
          </Button>
        </Form>
            )}
      </FormContainer>
     
    </div>
  );
}

export default SellerScreen;
// {companyLoading ? (<Loader />) :
// companyError ?((<Message variant='danger'>{companyError}</Message>))
// : companyNameBackend ?(navigate('/seller/details'))
// :(
