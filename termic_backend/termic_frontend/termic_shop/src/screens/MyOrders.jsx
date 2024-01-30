import React,{ useEffect } from 'react'
import { Table,Button } from 'react-bootstrap'
import  Loader   from '../components/Loader'
import  Message   from '../components/Message'
import { useDispatch,useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import {  myOrders } from '../actions/orderActions'
import { useNavigate,Link } from 'react-router-dom'
// import Paginate from '../components/Paginate'

function MyOrders() {
    const dispatch =useDispatch()
    const navigate = useNavigate();

    const orderList  = useSelector(state => state.myOrders)
    const { loading ,error, orders } = orderList


    const userLogin  = useSelector(state => state.userLogin)  //get the user info 
    const { userInfo } = userLogin







    useEffect (() => {
      if(userInfo){
        dispatch(myOrders())
      }else{
        navigate('/login')
      }
    },[dispatch,navigate,userInfo])


  return (
    <div>
        <Link to='/seller' className='btn btn-light  text-start' style={{backgroundColor:'black',color:'white'}}>Go Back</Link>
    <h1>Orders</h1>
        {loading ?
        (<Loader />)
          :
          error  ?
          (<Message variant='danger'>{error}</Message> )
          : (
            <div>
              <Table striped bordered hover responsive className='table-sm'>

                <thead>
                  <tr>
                      <th>                    ID                    </th>
                      <th>                    Product               </th>
                      <th>                    User                  </th>
                      <th>                    Date                  </th>
                      <th>                    Total                 </th>
                      <th>                    Paid                  </th>
                      <th>                    Delivered             </th>
                      <th>                                          </th>
                  </tr>
                </thead>
                {console.log("order details" ,orders)}

                <tbody>
                  {orders.map(order => (
                    
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.orderItems.length > 0 ? order.orderItems[0].name : 'N/A'}</td>
                      <td>{order.user && order.user.name}</td>
                      <td>{ order.createdAt && order.createdAt.substring(0,10)}</td>
                      <td>${order.totalPrice}</td>



                      <td>{order.isPaid ?
                      ( 
                          order.paidAt  && order.paidAt.substring(0,10)
                      ):(
                        <i className='fa-sharp fa-solid fa-xmark' style={{color:'red'}}></i>
                      )}</td>

                      <td>{order.isDelivered ?
                      ( 
                          order.deliveredAt && order.deliveredAt.substring(0,10)
                      ):(
                        <i className='fa-sharp fa-solid fa-xmark' style={{color:'red'}}></i>
                      )}</td>



                        <td>
                            <LinkContainer to={`/order/${order._id}`}>
                            <Button variant='light' className='btn-sm'>
                              Details
                            </Button>
                            </LinkContainer>
                        </td>

                        
                      </tr>
                  ))}
                </tbody>
              </Table>
             </div>
          ) }
    </div>
  )
}

export default MyOrders
