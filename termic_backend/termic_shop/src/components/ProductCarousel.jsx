import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel,Image,Button  } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'




function ProductCarousel( { maxProducts } ) {

    const dispatch = useDispatch()

    const productTopRated =useSelector((state) => state.productTopRated)
    const { error,loading,products } = productTopRated


    useEffect((e) => {
        dispatch(listTopProducts())
    },[dispatch])

  return ( loading ? <Loader />
  :
  error?
  <Message variant='danger'>{error}</Message>
  :
  (
    <div className="product-carousel-wrapper">
    <Carousel pause='hover'>
        {products.slice(0, maxProducts).map(product => (
            <Carousel.Item key={product._id}>
                <Link to={`/product/${product._id}`} className="text-decoration-none">
                    <Image src={product.corousel} alt = {product.name} fluid='true'/>
                    {/* <Carousel.Caption  className='carousel.caption'>
                        <h4>{product.name} (${product.price})</h4>
                    </Carousel.Caption> */}
                </Link>
            </Carousel.Item>
           
        ))}
    </Carousel>
    </div>
  )

  )
}

export default ProductCarousel
