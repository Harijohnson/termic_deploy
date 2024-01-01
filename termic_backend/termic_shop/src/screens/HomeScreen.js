import React, { useEffect, useState } from 'react';
import {Row,Col,Dropdown,Button} from 'react-bootstrap'
import  Product   from '../components/Product'
import { useDispatch,useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import  Loader   from '../components/Loader'
import  Message   from '../components/Message'
import { useLocation } from 'react-router-dom';  // Import useLocation
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'



function HomeScreen() {
    const dispatch =useDispatch()
    const productList  = useSelector(state =>state.productList)
    const {error,loading,products , page ,pages,  categories } = productList

    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

    let location = useLocation();
    let keyword = location.search;
  


    // console.log(keyword)
  useEffect(()=>{
    dispatch(listProducts(keyword))
    
  },[dispatch,keyword])
  const handleCategoryDropdown = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
  };

  const handleCategorySelection = (category) => {
    dispatch(listProducts(`?category=${category}`));
    setShowCategoryDropdown(false);
  };
  return (
    <div className="container">


<div className="mb-4">
        <Dropdown show={showCategoryDropdown} onMouseEnter={handleCategoryDropdown} onMouseLeave={handleCategoryDropdown}>
          <Dropdown.Toggle as={Button} variant="info" id="category-dropdown">
            Categories
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {categories.map((category) => (
              <Dropdown.Item key={category} onClick={() => handleCategorySelection(category)}>
                {category}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown> 
      </div>





      { !keyword && <ProductCarousel maxProducts={5} /> }
      <h1 className="my-4">Latest Produtcts </h1>
      {
        loading ? <Loader /> 
        : error ? <Message  variant='danger'>{error}</Message> 
        : products ? (

          <div>
              <Row  xs={2} sm={2} md={3} lg={4} xl={4} className="g-4">
                {products.map((product) => (
                    <Col key={ product._id} className="mb-3" >
                        <Product product={product}  />
                    </Col>
                ))}
              </Row>
              <Paginate page={page} pages={pages}  keyword={keyword}  />
        </div>
        ):(
          <Message variant="info">No products available</Message>
        )
    }
      
    </div>
  )
}

export default HomeScreen
