import React,{ useEffect,useState } from 'react'
import { Link,useLocation,useNavigate } from 'react-router-dom'
import { Form,Button,Col,Row } from 'react-bootstrap'
import  Loader   from '../components/Loader'
import  Message   from '../components/Message'
import { useDispatch,useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import  FormContainer   from '../components/FormContainer'
function SellerScreen() {
    const [companyname,setCompanyName] = useState('')
    const [aboutCompany,setAboutCompany] = useState('')
    
    const dispatch = useDispatch()

    const location = useLocation();
    const navigate = useNavigate();
    const redirect =  location.search ? location.search.split('=')[1]  : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error,loading,userInfo } = userLogin

    useEffect (() => {
        if (userInfo){
            navigate(redirect)
        }
    },[navigate,userInfo,redirect])

  return (
    

    


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
            value={email}
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
            value={password}
            onChange={(e)=>setPassword(e.target.value)}>

            </Form.Control>
        </Form.Group>

        <Button 
        type='submit'
        variant='primary' >
            Sign In
        </Button>


      </Form>

      <Row className = 'py-3'>
        <Col>
        New Customer ? <Link to ={redirect ? `/register?redirect = ${redirect}` : '/register'}>
            Register
        </Link>
        </Col>
      </Row>
    </FormContainer>


  )
}


export default SellerScreen
