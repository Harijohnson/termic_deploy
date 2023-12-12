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




function ProductEditScreen() {


    const navigate = useNavigate()

  



    const  { id } = useParams();
    // const orderId = match.params.id

    const productId  = id


    const [name,setName] = useState('')
    const [price,setPrice] = useState(0)
    const [brand,setBrand] = useState('')
    const [category,setCategory] = useState('')
    const [image,setImage] = useState('')
    const [countInStock,setCountInStock] = useState(0)
    const [description,setDescription] = useState("")
    const [uploading,setUploading] = useState(false)









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
                setImage(product.image || "")
                setCountInStock(product.countInStock || 0)
            }
        }}
     , [product,productId,navigate,dispatch,successUpdate])
    
    const submitHandeler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id:productId,
            name,
            price,
            image,
            brand,
            countInStock,
            category,
            description,
            }))

    }

   


    const uploadFileHandler  = async(e) =>
     {

        const file = e.target.files[0]
        const formData =new FormData()

        formData.append('image',file)
        formData.append('produc_id',productId)
        setUploading(true)

        try{


            const config ={
                headers:{
                    'Content-Type':'multipart/form-data',
                    Authorization  :`Bearer ${userInfo.token}`
                }
            }


            const {data} = await axios.post('api/products/upload/',formData,config)

            setImage(data)
            setUploading(false)

        }catch(error){
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

                    <Form.Group controlId='image'>
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
