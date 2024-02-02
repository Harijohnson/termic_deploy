// import React,{useEffect} from 'react'
// import { useDispatch,useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
// import { Carousel,Image,Button  } from 'react-bootstrap'
// import Loader from './Loader'
// import Message from './Message'
// import { listTopProducts } from '../actions/productActions'




// function ProductCarousel( { maxProducts } ) {

//     const dispatch = useDispatch()

//     const productTopRated =useSelector((state) => state.productTopRated)
//     const { error,loading,products } = productTopRated

//     // console.log(products)

//     useEffect((e) => {
//         dispatch(listTopProducts())
//     },[dispatch])

//   return ( loading ? <Loader />
//   :
//   error?
//   <Message variant='danger'>{error}</Message>
//   :
//   (
//     <div>
//     <Carousel pause='hover'>
//         {products.slice(0, maxProducts).map(product => (
//             <Carousel.Item key={product._id}>
//                 <Link to={`/product/${product._id}`} >
//                     <Image src={product.corousel} alt = {product.name} fluid='true'/>
//                 </Link>
//             </Carousel.Item>  
//         ))}       
//     </Carousel>
//     </div>
//   )

//   )
// }

// export default ProductCarousel
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel, Image, Button } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';

function ProductCarousel({ maxProducts }) {
  const dispatch = useDispatch();
  const productTopRated = useSelector((state) => state.productTopRated);
  const { error, loading, products } = productTopRated;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      {products.length > 0 && (
        <Carousel activeIndex={index} onSelect={handleSelect} pause="hover">
          {products.slice(0, maxProducts).map((product, idx) => (
            <Carousel.Item key={idx}>
              <Link to={`/product/${product._id}`}>
                <div className="carousel-image-container">
                  <Image src={product.corousel} alt={product.name} fluid />
                  <div className="carousel-buttons">
                    
                  <Button variant="light" className="left-button">
                  <i className="fa-solid fa-angle-left"></i>
                  </Button>
                  <Button variant="light" className="right-button">
                  <i className="fa-solid fa-angle-right"></i>
                  </Button>
                  </div>
                </div>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  );
}

export default ProductCarousel;
