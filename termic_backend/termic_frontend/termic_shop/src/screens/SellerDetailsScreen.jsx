// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { companyDetails } from '../actions/productActions';

// import { Table, Button, Row, Col } from 'react-bootstrap';
// import Loader from '../components/Loader';
// import Message from '../components/Message';
// import { LinkContainer } from 'react-router-bootstrap';
// import {
//   listProducts,
//   deleteProduct,
//   createProduct,
//   getProductsByCompany,
// } from '../actions/productActions';
// import { useNavigate, useParams } from 'react-router-dom';
// import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
// import Paginate from '../components/Paginate';
// import { useLocation } from 'react-router-dom';

// function SellerDetailsScreen() {
//   const navigate = useNavigate();
//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;
//   const dispatch = useDispatch();

//   const { id } = useParams();
//   const userId = id;

//   const productDelete = useSelector((state) => state.productDelete);
//   const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

//   const productCreate = useSelector((state) => state.productCreate);
//   const {
//     loading: loadingCreate,
//     error: errorCreate,
//     success: successCreate,
//     product: createdProduct,
//   } = productCreate;

//   let location = useLocation();
//   let keyword = location.search;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await dispatch(getProductsByCompany());
//         await dispatch(companyDetails());

//         dispatch({ type: PRODUCT_CREATE_RESET });

//         if (successCreate) {
//           navigate(`/product/${createdProduct._id}/edit`);
//         } else {
//           dispatch(listProducts(keyword));
//         }
//       } catch (error) {
//         // Handle errors here
//       }
//     };

//     if (userInfo) {
//       fetchData();
//     } else {
//       navigate('/login');
//     }
//   }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct, keyword]);

//   const companyDetailsFromSelector = useSelector((state) => state.companyDetails);
//   const {
//     companyDetails: { companyName: companyNameBackend, aboutCompanyBackend: abtCom } = {},
//   } = companyDetailsFromSelector;

//   const companyProducts = useSelector((state) => state.companyProducts);
//   const { loading, error, companyDetails: { products }, page, pages } = companyProducts;

//   const deleteHandler = (id) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       dispatch(deleteProduct(id));
//     }
//   };

//   const createProductHandler = () => {
//     dispatch(createProduct());
//   };

//   return (
//     <div>
//       <Row className='align-items-center'>
//         <Col>
//           <h1>Products</h1>
//         </Col>
//         <Col className='d-flex justify-content-end'>
//           <Button
//             className='btn'
//             style={{ marginRight: '40px' }}
//             onClick={createProductHandler}
//           >
//             <i className='fas fa-plus'> </i> {'  '} Create Product
//           </Button>
//         </Col>
//       </Row>

//       {loadingDelete && <Loader />}
//       {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

//       {loadingCreate && <Loader />}
//       {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant='danger'>{error}</Message>
//       ) : (
//         <div>
//           <p>Company: {companyNameBackend}</p>
//           <Table striped bordered hover responsive className='table-sm'>
//             <thead>
//               <tr>
//                 <th>ID </th>
//                 <th>Name </th>
//                 <th>Price </th>
//                 <th>Category </th>
//                 <th>Brand </th>
//                 <th> </th>
//               </tr>
//             </thead>
//             <tbody>
//               {products &&
//                 products.map((product) => (
//                   <tr key={product._id}>
//                     <td>{product._id}</td>
//                     <td>{product.name}</td>
//                     <td>{product.price}</td>
//                     <td>{product.category}</td>
//                     <td>{product.brand}</td>
//                     <td>
//                       <LinkContainer to={`/admin/product/${product._id}/edit`}>
//                         <Button variant='light' className='btn-sm'>
//                           <i className='fas fa-edit'></i>
//                         </Button>
//                       </LinkContainer>
//                       <Button
//                         variant='danger'
//                         className='btn-sm'
//                         onClick={() => deleteHandler(product._id)}
//                       >
//                         <i className='fas fa-trash'></i>
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </Table>
//           <Paginate page={page} pages={pages} isAdmin={true}></Paginate>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SellerDetailsScreen;



import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { companyDetails } from '../actions/productActions';
import { Table, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { LinkContainer } from 'react-router-bootstrap';
import {
  listProducts,
  deleteProduct,
  createProduct,
  getProductsByCompany,
} from '../actions/productActions';
import { useNavigate, useParams } from 'react-router-dom';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import Paginate from '../components/Paginate';
import { useLocation } from 'react-router-dom';

function SellerDetailsScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const userId = id;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const companyDetailsFromSelector = useSelector((state) => state.companyDetails);
  const {
    companyDetails: { companyName: companyNameBackend, aboutCompanyBackend: abtCom } = {},
  } = companyDetailsFromSelector;

  const companyProducts = useSelector((state) => state.companyProducts);

  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  let location = useLocation();
  let keyword = location.search;

  useEffect(() => {
    console.log('SellerDetailsScreen useEffect triggered');
    const fetchData = async () => {
      try {
        // Check if companyDetails and products are already loaded
        if (!companyDetailsFromSelector.companyDetails || !companyProducts.companyDetails.products) {
          dispatch(getProductsByCompany());
          dispatch(companyDetails());
        }

        dispatch({ type: PRODUCT_CREATE_RESET });

        const createProductAction = dispatch(createProduct());

        if (createProductAction.success) {
          navigate(`/product/${createProductAction.product._id}/edit`);
        } else {
          dispatch(listProducts(keyword));
        }
      } catch (error) {
        // Handle errors here
        console.error('Error fetching data:', error);
      }
    };

    if (userInfo) {
      fetchData();
    } else {
      navigate('/login');
    }
  }, [companyDetailsFromSelector, companyProducts.companyDetails.products, dispatch, keyword, navigate, userInfo]);

  const {
    loading,
    error,
    companyDetails: { products },
    page,
    pages,
  } = companyProducts;

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='d-flex justify-content-end'>
          <Button className='btn' style={{ marginRight: '40px' }} onClick={createProductHandler}>
            <i className='fas fa-plus'> </i> {'  '} Create Product
          </Button>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div>
          <p>Company: {companyNameBackend}</p>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID </th>
                <th>Name </th>
                <th>Price </th>
                <th>Category </th>
                <th>Brand </th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(product._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Paginate page={page} pages={pages} isAdmin={true}></Paginate>
        </div>
      )}
    </div>
  );
}

export default SellerDetailsScreen;
