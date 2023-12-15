import React from 'react'
import {Card} from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

function Product( {product}) {
  return (
   <Card className="my-3 p-3 rounded product-card">
        <Link to={`./product/${product._id}`} className="text-decoration-none link-dark">
            <Card.Img src={product.image}  style={{ width: '100%', height: '220px' }}/> 
        </Link>
        <Card.Body>
        <Link to={`./product/${product._id}`} className="text-decoration-none link-dark">
            <Card.Title as='div'>
                <strong>{product.name}</strong>
            </Card.Title>  
        </Link>

        <Card.Text as='div'>
            <div className='my-3'>
                {/* {console.log('product.ratings :', product)} */}
                {/* {Number(product.rating)} from {product.numReviews} reviews */}
                <Rating value={product.rating} text={`${product.numReviews} reviews`} color={"#f8e825"} />
            </div>

        </Card.Text >

        <Card.Text as='h3'>
            ${product.price}
        </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product
