import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form,Button } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import  FormContainer   from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

function ShippingScreen() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart )
  const {shippingAddress} = cart


  const [address  ,setAddress] = useState(shippingAddress.address)
  const [city  ,setCity] = useState(shippingAddress.city)
  const [country  ,setCountry] = useState(shippingAddress.country)
  const [postalCode  ,setPostalCode] = useState(shippingAddress.postalCode)

  const dispatch = useDispatch()

  const submitHandeler = (e) =>{
    e.preventDefault()
    dispatch(saveShippingAddress({address,city,postalCode,country}))
    navigate('/payment')
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandeler}>

      <Form.Group controlId='address'>
            <Form.Label>
                Address
            </Form.Label>
            <Form.Control 
            required
            type='text'
            placeholder='Enter Address'
            value={address ? address : ""}
            onChange={(e)=>setAddress(e.target.value)}>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
            <Form.Label>
                City
            </Form.Label>
            <Form.Control 
            required
            type='text'
            placeholder='Enter City'
            value={city ? city : ""}
            onChange={(e)=>setCity(e.target.value)}>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
            <Form.Label>
                Country
            </Form.Label>
            <Form.Control 
            required
            type='text'
            placeholder='Enter country'
            value={country ? country : ""}
            onChange={(e)=>setCountry(e.target.value)}>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
            <Form.Label>
                Postalcode
            </Form.Label>
            <Form.Control 
            required
            type='number'
            placeholder='Enter Postalcode'
            value={postalCode ? postalCode : ""}
            onChange={(e)=>setPostalCode(e.target.value)}>
            </Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' >
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
