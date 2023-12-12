import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form,Button,Col } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
import  FormContainer   from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

function PaymentScreen() {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart )
    const {shippingAddress} = cart

    const dispatch = useDispatch()

    const [paymentMethod,setPaymentMethod] = useState('PayPal')
    
    if(!shippingAddress.address){
        navigate('/shipping')
    }


    const submitHandeler =(e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }


  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <Form onSubmit={submitHandeler}>
        <Form.Group>
            <Form.Label as='legend'>
                Select Method
            </Form.Label>
            <Col>
                <Form.Check
                type='radio'
                label='PayPal'
                id='paypal'
                name='paymentMethod'
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}>

                </Form.Check>
            </Col>
        </Form.Group>

        <Button type='submit' varient='primary'>
            Continue
        </Button>
      </Form>

    </FormContainer>
  )
}

export default PaymentScreen
