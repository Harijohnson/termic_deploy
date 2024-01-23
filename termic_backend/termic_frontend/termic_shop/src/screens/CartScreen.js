import React,{useEffect} from 'react'
import { Link,useLocation,useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { Row,Col,ListGroup,Image,Form,Button,Card } from 'react-bootstrap'
import  Message  from '../components/Message'
import { addToCart,removeFromCart } from '../actions/cartActions'


function CartScreen( ) {
  const location = useLocation();
  const pathnameArray = location.pathname.split('/');
  const productId = pathnameArray[pathnameArray.length - 1];
  const qty  = location.search ? Number(location.search.split('=')[1]) : 1
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const { cartItems } =cart
  const navigate = useNavigate();

  useEffect(()=>{
    if(productId){
      dispatch(addToCart(productId,qty))
    }
  },[dispatch,productId,qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandeler = () => {
    navigate('/shipping')
  }

  // const updateQuantityHandler = (productId, quantity) => {
  //   dispatch(updateCartItem(productId, quantity));
  // }

  return (
    <Row>
      <Link to='/' className='btn btn-light  text-start' style={{backgroundColor:'lightblue'}}>Continue to Shopping</Link>
      <Col md={8}>
        <h1>Shopping cart</h1>
          {cartItems.length === 0 ? (
            <Message variant='info'>
              Your Cart is Empty <Link to='/'> Go Back</Link>
            </Message>
          ) : 
          (
            
          <ListGroup variant = 'flush'>
              {cartItems.map((item) => (
                  <ListGroup.Item >
                  <Row key={item.productId} item={item} >
                    <Col md={2}>
                      <Image src={item.image1} alt={item.name} fluid rounded/>
                    </Col>
                    {/* {console.log('items arguments',item)} */}
                    <Col md={3}>
                      <Link to={`/products/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>
                      ${item.price}
                    </Col>
                    <Col md={3}>
                      <Form.Control  
                              as='select'
                              value={item.qty}
                              onChange={(e) => dispatch(addToCart(item.product,Number(e.target.value)))} >
                                {
                                  Number.isInteger(item.countInStock) && item.countInStock > 0 && (
                                  [...Array(item.countInStock).keys()].map((x) => (
                                    <option value={ x + 1 }  key={ x + 1 } >
                                      { x + 1 }
                                    </option>
                                  ))
                                )}
                        </Form.Control>
                    </Col>

                    <Col md={1}>
                      <Button
                      type='button'
                      variant='light'
                      onClick={() =>removeFromCartHandler(item.product) }>
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
          </ListGroup>)}
      </Col>

      <Col md={4}>
        <Card >
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc,item) => acc + item.qty ,0 )}) items
              </h2>
              $ {cartItems.reduce((acc,item) => acc + item.qty * item.price ,0 ).toFixed(2)}
            </ListGroup.Item>
          </ListGroup>


          <ListGroup.Item>
            <Button
            type='button'
            className='btn-black'
            disabled={cartItems.length === 0 }
            onClick={() => checkOutHandeler() }
            >
              Proceed to Checkout
            </Button>
          </ListGroup.Item>
        </Card>                 


      </Col>

    </Row>
  )
}

export default CartScreen
