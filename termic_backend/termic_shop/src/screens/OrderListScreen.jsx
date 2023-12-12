import React,{ useEffect } from 'react'
import { Table,Button } from 'react-bootstrap'
import  Loader   from '../components/Loader'
import  Message   from '../components/Message'
import { useDispatch,useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { listOrders } from '../actions/orderActions'
import { useNavigate } from 'react-router-dom'



function OrderListScreen() {
    const dispatch =useDispatch()
    const navigate = useNavigate();

    const orderList  = useSelector(state => state.orderList)
    const { loading ,error, orders } = orderList


    const userLogin  = useSelector(state => state.userLogin)  //get the user info 
    const { userInfo } = userLogin







    useEffect (() => {
      if(userInfo &&  userInfo.isAdmin){
        dispatch(listOrders())
      }else{
        navigate('/login')
      }
    },[dispatch,navigate,userInfo])



  return (
    <div>
    <h1>Orders</h1>
        {loading ?
        (<Loader />)
          :
          error  ?
          (<Message variant='danger'>{error}</Message> )
          : (
            <Table striped bordered hover responsive className='table-sm'>

              <thead>
                <tr>
                    <th>                    ID                 </th>
                    <th>                    User                  </th>
                    <th>                    Date                  </th>
                    <th>                    Total                  </th>
                    <th>                    Paid                  </th>
                    <th>                    Delivered                  </th>
                    <th>              </th>
                </tr>
              </thead>


              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
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

          ) }
    </div>
  )
}


export default OrderListScreen
