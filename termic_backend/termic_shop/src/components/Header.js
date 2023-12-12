
import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap'

import React from 'react'

import { useDispatch,useSelector } from 'react-redux'
import { NavDropdown } from 'react-bootstrap';


import SearchBox from './SearchBox'


import { logout } from '../actions/userActions'



function Header() {

  const  userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const dispatch = useDispatch()

  const logoutHandeler = () => {
    dispatch(logout())
  }

  return (
    <header>
        <Navbar expand="lg"    className="bg-body-tertiary" collapseOnSelect>
            <Container fluid>
                <LinkContainer to='/'> 
                  <Navbar.Brand  >TermicShop</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">


                <SearchBox />



                <Nav className="ms-auto">

                  <LinkContainer to='/cart/'>
                      <Nav.Link><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
                    </LinkContainer>

                      {userInfo ? (
                        <NavDropdown title = {userInfo.name} id='username'>
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
                          <Nav.Link><i className='fas fa-user'></i> Login</Nav.Link>
                        </LinkContainer>
                      ) }


                  {userInfo && userInfo.isAdmin &&  (
                    <NavDropdown title = 'Admin' id='adminmenue'>
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




