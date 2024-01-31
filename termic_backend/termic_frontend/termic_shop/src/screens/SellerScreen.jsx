import React,{ useEffect,useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import  Loader   from '../components/Loader'
import  Message   from '../components/Message'
import { useDispatch,useSelector } from 'react-redux'
import { registerCompany,companyDetails } from '../actions/productActions'
import  FormContainer   from '../components/FormContainer'

import {  myOrders } from '../actions/orderActions'

import { Button,} from 'react-bootstrap';

function SellerScreen() {
    
    
    const dispatch = useDispatch()

    const navigate = useNavigate();

    const userLogin = useSelector(state => state.userLogin)
    const { error,loading,userInfo } = userLogin




    useEffect (() => {
        if (!userInfo){
            navigate('/login')
        }else{
            dispatch(companyDetails())
        }
    },[navigate,userInfo,dispatch])

     

    const [companyName,setCompanyName] = useState('')
    const [aboutCompany,setAboutCompany] = useState('')





    const submitHandeler = ((e)=>
    {
        e.preventDefault()
        dispatch(registerCompany(companyName,aboutCompany,))
        const success = true

        if (success){
        navigate('details/')
        }

    })  
     








 
      
  return (
    <>  
    <Link to='/' className='btn btn-light  text-start' style={{backgroundColor:'rgb(80, 117, 104)',color:'white'}}>Go Back</Link>
              <FormContainer>
                <h1>Create Company</h1>

                {error && <Message variant='danger'>{error}</Message>}
                  {loading && <Loader />}
                <Form onSubmit={ submitHandeler }>
                  <Form.Group controlId='companyname'>
                      <Form.Label>
                          Company Name
                      </Form.Label>
                      <Form.Control 
                      type='text'
                      placeholder='Company Name'
                      value={companyName}
                      onChange={(e)=>setCompanyName(e.target.value)}>

                      </Form.Control>
                  </Form.Group>


                  <Form.Group controlId='aboutcompany'>
                      <Form.Label>
                          About Company
                      </Form.Label>
                      <Form.Control 
                      type='textarea'
                      placeholder='About Company'
                      value={aboutCompany}
                      onChange={(e)=>setAboutCompany(e.target.value)}>

                      </Form.Control>
                  </Form.Group>

                  <Button 
                  type='submit'
                  variant='primary' >
                      Submit
                  </Button>


                </Form>


              </FormContainer>
    </>
 
    )
}


export default SellerScreen
