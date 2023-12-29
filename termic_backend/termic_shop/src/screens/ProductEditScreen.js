import React,{ useEffect,useState } from 'react'
import { Link, useLocation,useNavigate,useParams } from 'react-router-dom'
import { Form,Button,Col,Row } from 'react-bootstrap'
import  Loader   from '../components/Loader'
import  Message   from '../components/Message'
import { useDispatch,useSelector } from 'react-redux'
import { listProductDetails, updateProduct } from '../actions/productActions'
import  FormContainer   from '../components/FormContainer'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import  axios  from 'axios'
import { Carousel } from 'react-bootstrap';





function ProductEditScreen() {
    const navigate = useNavigate()
    const  { id } = useParams();
    // const orderId = match.params.id
    const productId  = id

    // console.log('priduct_id is :',productId)


    const [name,setName] = useState('')
    const [price,setPrice] = useState(0)
    const [brand,setBrand] = useState('')
    const [category,setCategory] = useState('')
    const [image,setImage] = useState('')
    const [countInStock,setCountInStock] = useState(0)
    const [description,setDescription] = useState("")
    const [uploading,setUploading] = useState(false)

    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');
    const [image5, setImage5] = useState('');
    const [image6, setImage6] = useState('');
    const [image7, setImage7] = useState('');
    const [image8, setImage8] = useState('');
    const [image9, setImage9] = useState('');
    const [image10, setImage10] = useState('');
    const [carousel, setCarousel] = useState(null);


    const dispatch = useDispatch()

    

    const productDetails = useSelector((state) => state.productDetails)
    const { error,loading,product } = productDetails

    
    const productUpdate = useSelector((state) => state.productUpdate)
    const { error:errorUpdate,loading:loadingUpdate,success:successUpdate} = productUpdate

        
    const userLogin = useSelector((state)=>state.userLogin)
    const { userInfo } = userLogin

    
    useEffect (() => {

        if(successUpdate){
            dispatch({type:PRODUCT_UPDATE_RESET})
            navigate('/admin/productlist')
        }else{
            if(!product.name || product._id !== Number(productId)) {
            dispatch(listProductDetails(productId))
            }else{
                setName(product.name || "")
                setPrice(product.price || 0)
                setBrand(product.brand || "")
                setCategory(product.category || "")
                setDescription(product.description || "")
                // setImage(product.image || "")
                setCountInStock(product.countInStock || 0)
                setCarousel(product.carousel || null);
                // Assuming there are fields like 'image1', 'image2', etc. in the product model
                setImage1(product.image1 || '');
                setImage2(product.image2 || '');
                setImage3(product.image3 || '');
                setImage4(product.image4 || '');
                setImage5(product.image5 || '');
                setImage6(product.image6 || '');
                setImage7(product.image7 || '');
                setImage8(product.image8 || '');
                setImage9(product.image9 || '');
                setImage10(product.image10 || '');
             


            }
        }}
     , [product,productId,navigate,dispatch,successUpdate])
    
    const submitHandeler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id:productId,
            name,
            price,
            brand,
            countInStock,
            category,
            description,
            carousel,
            image1,
            image2,
            image3,
            image4,
            image5,
            image6,
            image7,
            image8,
            image9,
            image10,
            
            }))

    }

   


    const uploadFileHandler  = async(e,fieldName) =>
     {
        const file = e.target.files[0]
        const formData =new FormData()

        formData.append(fieldName,file)
        formData.append('product_id',productId)
        setUploading(true)

        try{


            const config ={
                headers:{
                    'Content-Type':'multipart/form-data',
                    Authorization  :`Bearer ${userInfo.token}`
                }
            }


            const {data} = await axios.post('/api/products/upload/',
            formData,
            config)

            if (fieldName === 'carousel') {
                setCarousel(data);
                } 
            else if (fieldName === 'image1') {
                setImage1(data);
                } 
            else if (fieldName === 'image2') {
                setImage2(data);
                } 
            else if (fieldName === 'image3') {
                setImage3(data);
                }
            else if (fieldName === 'image4') {
                setImage1(data);
                } 
            else if (fieldName === 'image5') {
                setImage2(data);
                } 
            else if (fieldName === 'image6') {
                setImage3(data);
                }
            else if (fieldName === 'image7') {
                setImage1(data);
                } 
            else if (fieldName === 'image8') {
                setImage2(data);
                } 
            else if (fieldName === 'image9') {
                setImage3(data);
                }
            else if (fieldName === 'image10') {
                    setImage1(data);
                    } 
              
            
            setUploading(false)

        }catch(error){
            console.error('File upload error:', error);
            setUploading(false)
        }
    }



  return (

    <div>

        <Link to='/admin/productlist'>Go Back</Link>

        <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant = 'danger'>{errorUpdate}</Message>}


            {loading ? <Loader />
            :error ?  (<Message variant='danger'>{error}</Message>)
            :(
                <Form onSubmit={ submitHandeler }>
                    <Form.Group controlId='name'>
                        <Form.Label>
                            Name
                        </Form.Label>
                        <Form.Control 
                        type='text'
                        placeholder='Name'
                        value={name}
                        onChange={(e)=>setName(e.target.value)}>

                        </Form.Control>
                    </Form.Group>


                    <Form.Group controlId='price'>
                        <Form.Label>
                            Price
                        </Form.Label>
                        <Form.Control 
                        type='number'
                        placeholder='Enter Price'
                        value={price}
                        onChange={(e)=>setPrice(e.target.value)}>

                        </Form.Control>
                    </Form.Group>
















                    {/* <Form.Group controlId='image'>
                        <Form.Label>
                            Image
                        </Form.Label>

                        <Form.Control 
                        type='text'
                        placeholder='Enter Image'
                        value={image}
                        onChange={(e)=>setImage(e.target.value)}>

                        </Form.Control>

                        <Form.Control
                        type='file'
                        label ='Choose Image'
                        custom='true'
                        onChange ={ uploadFileHandler}>
                            
                        </Form.Control>
                        {uploading && <Loader />}

                    </Form.Group>  */}

                <Form.Group controlId='image1'>
                    <Form.Label>Image 1</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Image 1'
                        value={image1}
                        onChange={(e) => setImage1(e.target.value)}
                    />
                   <Form.Control
                        type='file'
                        label ='Choose Image'
                        custom='true'
                        onChange={(e) => uploadFileHandler(e, 'image1')} 
                        required >
                            
                        </Form.Control>
                        {uploading && <Loader />}
                </Form.Group>


                <Form.Group controlId='image2'>
                <Form.Label>Image 2</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter Image 2'
                    value={image2}
                    onChange={(e) => setImage2(e.target.value)}
                />
                    <Form.Control
                        type='file'
                        label ='Choose Image'
                        custom='true'
                        onChange={(e) => uploadFileHandler(e, 'image2')}  >
                            
                        </Form.Control>
                    {uploading && <Loader />}
                </Form.Group>


                <Form.Group controlId='image3'>
                    <Form.Label>Image 3</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Image 3'
                        value={image3}
                        onChange={(e) => setImage3(e.target.value)}
                    />
                    <Form.Control
                        type='file'
                        label ='Choose Image'
                        custom='true'
                        onChange={(e) => uploadFileHandler(e, 'image3')}  >
                            
                        </Form.Control>
                    {uploading && <Loader />}
                </Form.Group>



                <Form.Group controlId='image4'>
                    <Form.Label>Image 4</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Image 4'
                        value={image4}
                        onChange={(e) => setImage4(e.target.value)}
                    />
                    <Form.Control
                        type='file'
                        label ='Choose Image'
                        custom='true'
                        onChange={(e) => uploadFileHandler(e, 'image4')}  >
                            
                        </Form.Control>
                    {uploading && <Loader />}
                </Form.Group>


                <Form.Group controlId='image5'>
                <Form.Label>Image 5</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter Image 5'
                    value={image5}
                    onChange={(e) => setImage5(e.target.value)}
                />
                    <Form.Control
                        type='file'
                        label ='Choose Image'
                        custom='true'
                        onChange={(e) => uploadFileHandler(e, 'image5')}  >
                            
                        </Form.Control>
                    {uploading && <Loader />}
                </Form.Group>


                <Form.Group controlId='image6'>
                    <Form.Label>Image 6</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Image 6'
                        value={image6}
                        onChange={(e) => setImage6(e.target.value)}
                    />
                    <Form.Control
                        type='file'
                        label ='Choose Image'
                        custom='true'
                        onChange={(e) => uploadFileHandler(e, 'image6')}  >
                            
                        </Form.Control>
                    {uploading && <Loader />}
                </Form.Group>






                <Form.Group controlId='image7'>
                    <Form.Label>Image 7</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Image 7'
                        value={image7}
                        onChange={(e) => setImage7(e.target.value)}
                    />
                    <Form.Control
                        type='file'
                        label ='Choose Image'
                        custom='true'
                        onChange={(e) => uploadFileHandler(e, 'image7')}  >
                            
                        </Form.Control>
                    {uploading && <Loader />}
                </Form.Group>


                <Form.Group controlId='image8'>
                <Form.Label>Image 8</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter Image 8'
                    value={image8}
                    onChange={(e) => setImage8(e.target.value)}
                />
                    <Form.Control
                        type='file'
                        label ='Choose Image'
                        custom='true'
                        onChange={(e) => uploadFileHandler(e, 'image8')}  >
                            
                        </Form.Control>
                    {uploading && <Loader />}
                </Form.Group>




                <Form.Group controlId='image9'>
                    <Form.Label>Image 9</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Image 9'
                        value={image9}
                        onChange={(e) => setImage9(e.target.value)}
                    />
                    <Form.Control
                        type='file'
                        label ='Choose Image'
                        custom='true'
                        onChange={(e) => uploadFileHandler(e, 'image9')}  >
                            
                        </Form.Control>
                    {uploading && <Loader />}
                </Form.Group>






                <Form.Group controlId='image10'>
                    <Form.Label>Image 10</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Image 10'
                        value={image10}
                        onChange={(e) => setImage10(e.target.value)}
                    />
                   <Form.Control
                        type='file'
                        label ='Choose Image'
                        custom='true'
                        onChange={(e) => uploadFileHandler(e, 'image10')}  >
                            
                        </Form.Control>
                    {uploading && <Loader />}
                </Form.Group>



                {/* coroulesl */}

                <Form.Group controlId='carouselImage'>
              <Form.Label>Carousel Image</Form.Label>
              <Row>
                  <Form.Control
                    type='text'
                    placeholder='Enter Carousel Image'
                    value={carousel}
                    onChange={(e) => setCarousel(e.target.value)}
                  />
              
                
                    <Form.Control
                        type='file'
                        label ='Choose Image'
                        custom='true'
                        onChange={(e) => uploadFileHandler(e, 'image10')}  >
                            
                    </Form.Control>
                        
                  {uploading && <Loader />}
                
              </Row>
                </Form.Group>








                    <Form.Group controlId='brand'>
                        <Form.Label>
                            Brand
                        </Form.Label>
                        <Form.Control 
                        type='text'
                        placeholder='brand'
                        value={brand}
                        onChange={(e)=>setBrand(e.target.value)}>

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='countinstock'>
                        <Form.Label>
                            Stock
                        </Form.Label>
                        <Form.Control 
                        type='number'
                        placeholder='Stock'
                        value={countInStock}
                        onChange={(e)=>setCountInStock(e.target.value)}>

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='category'>
                        <Form.Label>
                            Category
                        </Form.Label>
                        <Form.Control 
                        type='text'
                        placeholder='Category'
                        value={category}
                        onChange={(e)=>setCategory(e.target.value)}>

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description'>
                        <Form.Label>
                           Description
                        </Form.Label>
                        <Form.Control 
                        type='text'
                        placeholder='Description'
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}>

                        </Form.Control>
                    </Form.Group>


                    <br></br>

                    <Button 
                    type='submit'
                    variant='primary' >
                        Update
                    </Button>


                </Form>

            )}
        </FormContainer>
    </div>
  )
}

export default ProductEditScreen
