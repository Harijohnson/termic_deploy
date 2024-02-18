import React from 'react'
import {Card} from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';




function Product( {product}) {
  return (
   <Card className="my-3 p-3 rounded product-card position-relative">
        {product.digital && (
                <div className="position-absolute top-0 end-0 m-0">
                    <button className="btn btn-danger">
                        <FontAwesomeIcon icon={faDownload} />
                        <span className="ms-1">Download</span>
                    </button>
                </div>
            )}
        
        <Link to={`./product/${product._id}`} className="text-decoration-none ">
            <Card.Img src={product.image1}  
            alt={product.name} 
            className ='card-img'
            /> 
        </Link>
        <Card.Body>
        <Link to={`./product/${product._id}`} className="text-decoration-none ">
            <Card.Title as='div'>
                <strong>{product.name}</strong>
            </Card.Title>  
        </Link>
        {/* {product.digital && (  
               <div className="digital-icon">
               <FontAwesomeIcon icon={faDownload} title="Digital Product"> </FontAwesomeIcon>
              <label className='digital-text'><>{' '}</> Digital Downlodable </label>  
             </div>
          )} */}
        <Card.Text as='div'>
            <>
            <div className='my-3'>
                {/* {console.log('product.ratings :', product)} */}
                {/* {Number(product.rating)} from {product.numReviews} reviews */}
                <Rating value={product.rating} text={`${product.numReviews} reviews`} color={"#f8e825"} />
            </div>
            
            </>
        </Card.Text >

      


        <Card.Text as='h3'>
            ${product.price}
        </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product
