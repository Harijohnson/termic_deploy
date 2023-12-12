import React,{ useEffect,useState } from 'react'
import { Link, useLocation,useNavigate } from 'react-router-dom'
import { Form,Button,Col,Row } from 'react-bootstrap'
import  Loader   from '../components/Loader'
import  Message   from '../components/Message'
import { useDispatch,useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import  FormContainer   from '../components/FormContainer'


function RegisterScreen() {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState('')
    
    const dispatch = useDispatch()

    const location = useLocation();
    const navigate = useNavigate();
    const redirect =  location.search ? location.search.split('=')[1]  : '/'

    const userRegister = useSelector((state) => state.userRegister)
    const { error,loading,userInfo } = userRegister

    useEffect (() => {
        if (userInfo){
            navigate('/')
            // navigate(redirect)
        }
    },[navigate,userInfo,redirect])

    const submitHandeler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword){
            setMessage('Password does not match')
        }
        else{
        dispatch(register(name,email,password))
        }
    }
  return (
    <FormContainer>
      <h1>Sign In</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
      <Form onSubmit={ submitHandeler }>
      <Form.Group controlId='name'>
            <Form.Label>
                Name
            </Form.Label>
            <Form.Control 
            required
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e)=>setName(e.target.value)}>

            </Form.Control>
        </Form.Group>
        
        <Form.Group controlId='email'>
            <Form.Label>
                Email Address
            </Form.Label>
            <Form.Control
            required 
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}>

            </Form.Control>
        </Form.Group>


        <Form.Group controlId='password'>
            <Form.Label>
                Password
            </Form.Label>
            <Form.Control 
                required
                type='password'
                placeholder='Enter Password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}>

            </Form.Control>
        </Form.Group>

        <Form.Group controlId='passwordConfirm'>
            <Form.Label>
                Confirm Password
            </Form.Label>
            <Form.Control 
                required
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}>

            </Form.Control>
        </Form.Group>


        <Button 
        type='submit'
        variant='primary' >
            Register
        </Button>


      </Form>

      <Row className = 'py-3'>
        <Col>
        Already Customer ? <Link to ={redirect ? `/login?redirect = ${redirect}` : '/login'}>
            Sign In
        </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
