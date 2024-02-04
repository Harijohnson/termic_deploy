    import React,{ useEffect,useState } from 'react'
    import { useNavigate } from 'react-router-dom'
    import { Form,Button,Col,Row,Table } from 'react-bootstrap'
    import  Loader   from '../components/Loader'
    import  Message   from '../components/Message'
    import { useDispatch,useSelector } from 'react-redux'
    import { getUserDetails,updateUserProfile } from '../actions/userActions'
    import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
    import { listMyOrders } from '../actions/orderActions'
    import {  LinkContainer} from 'react-router-bootstrap'






    function ProfileScreen() {
        const userDetails = useSelector((state) => state.userDetails)
        const { error,loading,user } = userDetails

        const [name,setName] = useState( user.name || "")
        const [email,setEmail] = useState( user.email  ||  '')
        const [password,setPassword] = useState('')
        const [confirmPassword,setConfirmPassword] = useState('')
        const [message,setMessage] = useState('')
        
        const dispatch = useDispatch()

        const navigate = useNavigate();

    

        const userLogin = useSelector((state) => state.userLogin)
        const { userInfo } = userLogin

        const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
        const { success } = userUpdateProfile




        const orderListMy = useSelector((state) => state.orderListMy)
        const { loading:loadingOrders, error:errorOrders , orders } = orderListMy



        useEffect (() => {
            if (!userInfo){
                navigate('/login')
            }else{
                if (!user || !user.name || success || userInfo._id !== user._id){
                    dispatch({type:
                    USER_UPDATE_PROFILE_RESET
                    })
                    dispatch (getUserDetails('profile'))
                    dispatch(listMyOrders())
                }
                else{
                    setName(user.name || "")
                    setEmail(user.email || "")
                }

            }
        },[dispatch,navigate,userInfo,user,success])

        const submitHandeler = (e) => {
            e.preventDefault()

            if (password !== confirmPassword){
                setMessage('Password does not match')
            }
            else{
            dispatch(updateUserProfile({
                'id':user._id,
                'name':name,
                'email':email,
                'password':password,
            }))
            setMessage('')
            }
        }
        return (
            <Row>
                <Col md={3}>
                    <h2>User Profile</h2>
                        {message && <Message variant='danger'>{message}</Message>}
                        {error && <Message variant='danger'>{error}</Message>}
                        {loading && <Loader />}
                        <Form onSubmit={ submitHandeler }>
                            <Form.Group controlId='name'>
                                <Form.Label>
                                    Name
                                </Form.Label>
                                <Form.Control 
                                type='text'
                                placeholder='Name'
                                value={name}
                                onChange={(e)=>setName(e.target.value)}>

                                </Form.Control>
                            </Form.Group>
                            
                            <Form.Group controlId='email'>
                                <Form.Label>
                                    Email Address
                                </Form.Label>
                                <Form.Control 
                                type='email'
                                placeholder='Enter Email'
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}>

                                </Form.Control>
                            </Form.Group>


                            <Form.Group controlId='password'>
                                <Form.Label>
                                    Password
                                </Form.Label>
                                <Form.Control 
                                    type='password'
                                    placeholder='Enter Password'
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}>

                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='passwordConfirm'>
                                <Form.Label>
                                    Confirm Password
                                </Form.Label>
                                <Form.Control 
                                    type='password'
                                    placeholder='Confirm Password'
                                    value={confirmPassword}
                                    onChange={(e)=>setConfirmPassword(e.target.value)}>

                                </Form.Control>
                            </Form.Group>


                            <Button 
                            className='d-grid  t-5'
                            type='submit'
                            variant='primary' >
                                Update
                            </Button>


                        </Form>

                </Col>

                <Col md={9}>
                    <h2>My Orders</h2>
                    {loadingOrders ? (
                        <Loader />
                    ): errorOrders ? ( 
                        <Message  variant='danger' >{errorOrders }</Message>
                    ) :
                    (
                        <Table striped responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>
                                        ID
                                    </th>

                                    <th> 
                                        Product 
                                    </th>

                                    <th>
                                        Date
                                    </th>

                                    <th>
                                        Total
                                    </th>
                                    <th>
                                        Paid
                                    </th>
                                    <th>
                                        Delivered
                                    </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders && orders.map(order =>(
                                    <tr key={order._id}>
                                        <td>
                                            {order._id}
                                        </td>
                                        <td>{order.orderItems.length > 0 ? order.orderItems[0].name : 'N/A'}</td>
                                        <td>
                                            {order.createdAt &&  order.createdAt.substring(0,10)}
                                        </td>
                                        <td>
                                            ${order.totalPrice}
                                        </td>
                                        <td>
                                            {order.isPaid ? (order.paidAt && order.paidAt.substring(0, 10))  : (
                                                <i className='fas fa-times' style={{color:'red'}}></i>
                                            )}
                                        </td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button className='btn-sm'>
                                                    Details
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                        <td>
                                            
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        )
    }

    export default ProfileScreen
