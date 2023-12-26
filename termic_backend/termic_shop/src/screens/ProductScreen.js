import React,{useEffect, useState} from 'react'
import { Link,useParams,useNavigate  } from 'react-router-dom'
import { Row,Col,Image,ListGroup,Card,Button,Form, FormGroup, } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useDispatch,useSelector } from 'react-redux'
import { listProductDetails,createProductReview } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'



function ProductScreen(  ) {
 
  const dispatch = useDispatch()




  const productDetails = useSelector(state => state.productDetails)
  const { loading,error,product } = productDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin


  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const { loading:loadingProductReview,
    error:errorProductReview,
    success:successProductReview
   } = productReviewCreate




  const [qty,setQty] = useState(1)
  const [rating,setRating] = useState(0)
  const [comment,setComment] = useState("")
  // const [selectedImage, setSelectedImage] = useState(product?.image1 || '');




  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(()=>{

    if(successProductReview){
      setRating(0)
      setComment('')
      dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
    }





      dispatch(listProductDetails(id))
    
      },[dispatch,id,successProductReview])
    
  const addToCartHandeler = () =>{
      navigate(`/cart/${id}?qty=${qty}`)
  }



  const submitHandeler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(
     id,{rating,comment}

    ))
  }

  const [selectedImage, setSelectedImage] = useState(product.image1 || "");
  const countAvailableImages = product.image1 ? 1 : 0;


  const handleImageClick = (image) => {
    // console.log('Image change is clicked');
    // console.log('Selected Image Before:', selectedImage);
    setSelectedImage(image);
    // console.log('Selected Image After:', selectedImage);
  };
  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>Go Back</Link>
        {loading ?
          <Loader />
          :
          error ?
          <Message variant={'danger'}> {error}</Message>
          :
          (
            <div>
            <Row>

            {/* <Col md={6}>
              <Image src={product.image1}  alt ={product.name} style = {{width:'100%',height:'auto',borderRadius:'20px'}}/> 
            </Col> */}

            <Col md={6}>
            {product.image1 && (
                <Image
                  src={selectedImage || product.image1}
                  alt={product.name}
                  style={{ width: '100%', height: 'auto', borderRadius: '20px' }}
                />
              )}
              {product.image1 && (
               <Row className="mt-3">
               {[...Array(9).keys()].map(index => {
                 const imageKey = `image${index + 1}`;
                 // Check if the image is available and not null or undefined
                 if (product[imageKey] !== null && product[imageKey] !== undefined) {
                   return (
                      <Col md={1} key={index + 1} className="mb-3"> 
                      
                       <Image
                         src={product[imageKey]}
                         alt={`${product.name} - ${index + 1}`}
                         className="img-fluid img-thumbnail"
                         style={{ cursor: 'pointer', width: '100px', height: 'auto' }}
                         onClick={() => handleImageClick(product[imageKey])}
                       />
                     </Col>
                   );
                 }
                 return null; // Skip rendering if image is null or undefined
               })}
             </Row>
              )}
              
            </Col>


    
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
    
                <ListGroup.Item>
                  <Rating value={product.rating} text={`${product.numReviews} reviews`}  color={'#f8e825'}/>
                </ListGroup.Item>
                
                <ListGroup.Item>
                  <strong>Price : ${product.price} </strong>
                </ListGroup.Item>
    
                <ListGroup.Item>
                  Discription : {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
    
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col> Price:</Col>
                      <Col> <strong>{product.price}</strong> </Col>
                    </Row>
                  </ListGroup.Item>
    
    
                  <ListGroup.Item>
                    <Row>
                      <Col> Status:</Col>
                      <Col> {product.countInStock >0 ? 'In Stock' :'Out of Stock'}</Col>
                    </Row>
                  </ListGroup.Item>



                  
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>
                          Quantity
                          </Col>
                          <Col className='my-1'>
                            <Form.Control  
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}

                            >
                              {
                                [...Array(product.countInStock).keys()].map((x) => (
                                  <option value={ x + 1 }  key={ x + 1 } >
                                    { x + 1 }
                                  </option>
                                ))
                              }
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item> 
                    ) }
                  


                  <ListGroup.Item>
                    <Button className='btn-block' 
                    type='button' 
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandeler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
    
    
                </ListGroup>
              </Card>
            </Col>
    
            </Row>

            <Row>
              <Col md={6}>
                <h4>Reviews</h4>
                  {product.reviews.length === 0 && 
                  <Message variant = 'info'>
                    No Reviews
                    </Message>}

                  <ListGroup variant='flush'>
                    {product.reviews.map((review)=>(
                      <ListGroup.Item key = {review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} color='#f8e835'> </Rating>
                          <p>{ review.createdAt.substring(0,10)}</p>
                          <p>{ review.comment }</p>
                        
                      </ListGroup.Item>

                    ))}


                    <ListGroup.Item>
                      <h4>Write a Review</h4>

                      {loadingProductReview && <Loader/>}
                      {successProductReview && <Message variant='success'>Review Successfully Submited</Message>}
                      {errorProductReview && <Message variant='success'>{errorProductReview}</Message>}
                      
                      
                      
                      
                      {userInfo  ? (
                        <Form onSubmit={ submitHandeler}>

                            <Form.Group controlId='rating'>

                              <Form.Label>
                                Rating
                              </Form.Label>
                              <Form.Control as='select' 
                              value = {rating} 
                              onChange={(e) => setRating(e.target.value)}>
                                <option
                                  value = "">
                                    Select ..
                                </option>
                                <option
                                  value = "1">
                                    1  -  Poor
                                </option>
                                <option
                                  value = "2">
                                    2  -  Fair
                                </option>
                                <option
                                  value = "3">
                                    3  -  Good
                                </option>
                                <option
                                  value = "4">
                                    4  -  Very Good
                                </option>
                                <option
                                  value = "5">
                                   5  -  Excelent
                                </option>
                              </Form.Control>
                            </Form.Group>


                          <FormGroup controlId ='comment'>
                              <Form.Label>
                                Review
                              </Form.Label>
                              <Form.Control
                              as = 'textarea'
                              row = '5'
                              value ={comment}
                              placeholder='Wrie a review'
                              onChange={(e)=>setComment(e.target.value)}>

                              </Form.Control>
                          </FormGroup>

                        <Button disabled ={loadingProductReview} 
                        type='submit'
                        variant='primary'>
                          Submit
                        </Button>

                        </Form>
                      ) : (
                        <Message variant={'info'}>Please Login <Link to='/login'> login</Link> to write a review </Message>
                      )}
                    </ListGroup.Item>
                      
                  </ListGroup>
              </Col>
            </Row>
          </div>
          )
        
        }    
    </div>
  )
}

export default ProductScreen
