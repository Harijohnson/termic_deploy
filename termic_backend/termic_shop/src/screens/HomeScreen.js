// import React, { useEffect, useState, } from 'react';
// import {Row,Col,Dropdown,Button} from 'react-bootstrap'
// import  Product   from '../components/Product'
// import { useDispatch,useSelector } from 'react-redux'
// import { listProducts } from '../actions/productActions'
// import  Loader   from '../components/Loader'
// import  Message   from '../components/Message'
// import { Link, useLocation,useNavigate } from 'react-router-dom';  // Import useLocation
// import Paginate from '../components/Paginate'
// import ProductCarousel from '../components/ProductCarousel'




// function HomeScreen() {
//     const dispatch =useDispatch()
//     const productList  = useSelector(state =>state.productList)
//     const {error,loading,products , page ,pages,  } = productList
//     // console.log('Product List State:', productList);
    // const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

//     const location = useLocation();
//     const keyword = location.search;
//     const uniqueCategories = [...new Set(products.map(product => product.category))];
//     const navigate = useNavigate();


    
//     // console.log('Categories:', categories/);
 
//     // console.log(keyword)
//   useEffect(()=>{
//     dispatch(listProducts(keyword))
    
//   },[dispatch,keyword])


  // const handleCategoryDropdown = () => {
  //   setShowCategoryDropdown(!showCategoryDropdown);
  // };


//   const handleCategorySelection = (category) => {
//     // Example: Navigating to the category screen
//     navigate(`/category/${category}`);
//   };

//   return (
//     <div className="container">


// <div className="mb-4">
// <Dropdown show={showCategoryDropdown} onToggle={handleCategoryDropdown}>
//           <Dropdown.Toggle as={Button} variant="info" id="category-dropdown" className="custom-category-dropdown">
//             Categories
//           </Dropdown.Toggle>
//           <Dropdown.Menu>
//             {uniqueCategories &&
//               uniqueCategories.map((category) => (
//                 <Dropdown.Item key={category} onClick={() => handleCategorySelection(category)}>
//                   <Link to={`?category=${category}`}>{category}</Link>
//                 </Dropdown.Item>
//               ))}
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>





//       { !keyword && <ProductCarousel maxProducts={5} /> }
//       <h1 className="my-4">Latest Produtcts </h1>
//       {
//         loading ? <Loader /> 
//         : error ? <Message  variant='danger'>{error}</Message> 
//         : products ? (

//           <div>
//               <Row  xs={2} sm={2} md={3} lg={4} xl={4} className="g-4">
//                 {products.map((product) => (
//                     <Col key={ product._id} className="mb-3" >
//                         <Product product={product}  />
//                     </Col>
//                 ))}
//               </Row>
              
//               <>
//         <Paginate page={page} pages={pages}  keyword={keyword}  />
//         </>
//         </div>
        
//         ):(
//           <Message variant="info">No products available</Message>
//         )
//     }
      
//     </div>
//   )
// }

// export default HomeScreen


import React, { useEffect, useState } from 'react';
import { Row, Col, Dropdown, Button } from 'react-bootstrap';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword') || '';
  const categoryParam = new URLSearchParams(location.search).get('category') || '';
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const uniqueCategories = [...new Set(products.map((product) => product.category))];
  const navigate = useNavigate();
  const handleCategoryDropdown = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
  };

  useEffect(() => {
    dispatch(listProducts(keyword, categoryParam));
  }, [dispatch, keyword, categoryParam]);




const handleCategorySelection = (category) => {
  navigate(`/?category=${encodeURIComponent(category)}&keyword=${encodeURIComponent(keyword)}`);
};

// ... (remaining code)

  return (
    <div className="container">
      <div className="mb-4">
        <Dropdown show={showCategoryDropdown} onToggle={handleCategoryDropdown}>
          <Dropdown.Toggle as={Button} variant="info" id="category-dropdown" className="custom-category-dropdown">
            Categories
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {uniqueCategories &&
              uniqueCategories.map((category) => (
                <Dropdown.Item key={category} onClick={() => handleCategorySelection(category)}>
                  <Link to={`/?category=${encodeURIComponent(category)}&keyword=${encodeURIComponent(keyword)}`}>
                    {category}
                  </Link>
                </Dropdown.Item>

              ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {!keyword && <ProductCarousel maxProducts={5} />}
      <h1 className="my-4">Latest Products </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : products ? (
        <div>
          <Row xs={2} sm={2} md={3} lg={4} xl={4} className="g-4">
            {products.map((product) => (
              <Col key={product._id} className="mb-3">
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword} category={categoryParam} />
        </div>
      ) : (
        <Message variant="info">No products available</Message>
      )}
    </div>
  );
}

export default HomeScreen;
