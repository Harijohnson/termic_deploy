
  import Container from 'react-bootstrap/Container';

  import Nav from 'react-bootstrap/Nav';
  import Navbar from 'react-bootstrap/Navbar';
  import { LinkContainer } from 'react-router-bootstrap'

  import React,{useEffect} from 'react'

  import { useDispatch,useSelector, } from 'react-redux'
  import { Button, NavDropdown } from 'react-bootstrap';


  import SearchBox from './SearchBox'


  import { logout } from '../actions/userActions'

  import { companyDetails } from '../actions/productActions'
  import { useNavigate, } from 'react-router-dom'
  import  Loader   from '../components/Loader'
  import  Message   from '../components/Message'
  function Header() {

    const  userLogin = useSelector(state => state.userLogin)
    const dispatch = useDispatch()
    const {userInfo} = userLogin

    const navigate = useNavigate();
    const companyDetailsFromSelector = useSelector(state => state.companyDetails)
    const {loading:conpanyLoading,error:cpmpanyError,companyDetails:{ companyName:companyNameBackend,aboutCompanyBackend:abtCom}={}} = companyDetailsFromSelector

    useEffect(() => {
      if (userInfo) {
        dispatch(companyDetails())
      }
    }, [dispatch, userInfo])


    const logoutHandeler = () => {
      dispatch(logout())
    }



    const sellerHandeler = ( ()=>{

      if (userInfo && !companyNameBackend ){
        navigate('/seller')
      }else if (userInfo && companyNameBackend){
        navigate('/seller/details')
      }else{
        navigate('/')
      }
     
    })
      



    return (
      <header>
          <Navbar expand="lg"    className="bg-dark" variant='dark' collapseOnSelect>
              <Container fluid >
                  <LinkContainer to='/'> 
                    <Navbar.Brand  >TermicShop</Navbar.Brand>
                  </LinkContainer>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav"  className="justify-content-center" >


                  <SearchBox />



                  <Nav>

                    <LinkContainer to='/cart/'>
                        <Nav.Link><i className='fas fa-shopping-cart fa-lg me-1'></i> </Nav.Link>
                      </LinkContainer>

                        {userInfo ? (
                          <NavDropdown title = {<i className="fas fa-user fa-lg me-1"></i>} id='username'>
                            <LinkContainer to='/profile'>
                              <NavDropdown.Item>
                                Profile
                              </NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item onClick={ logoutHandeler }>
                                Logout
                            </NavDropdown.Item>
                          </NavDropdown>        
                          
                        ) : (
                          <LinkContainer to='/login'>
                            <Nav.Link><i className='fas fa-user fa-lg me-1'></i> Login</Nav.Link>
                          </LinkContainer>
                        ) }




                          {userInfo && (
                            <NavDropdown title = {<i className="fa-solid fa-comments-dollar"></i>} id='mystore'>
                                      <NavDropdown.Item   onClick={sellerHandeler}>
                                          My Store
                                        </NavDropdown.Item>
                          </NavDropdown>
                          )}
                        
                       


                        {userInfo && userInfo.isAdmin &&  (
                      <NavDropdown title = {<> <i className="fas fa-crown fa-lg me-1"> </i> Admin</>} id='adminmenue'>
                      <LinkContainer to='/admin/userlist'>
                        <NavDropdown.Item>
                          Users
                        </NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to='/admin/productlist'>
                        <NavDropdown.Item>
                          Products
                        </NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to='/admin/orderlist'>
                        <NavDropdown.Item>
                          Orders
                        </NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                    )}
                    

                  </Nav>
                  </Navbar.Collapse>
              </Container>
          </Navbar>
      </header>
    
    )
  }

  export default Header




