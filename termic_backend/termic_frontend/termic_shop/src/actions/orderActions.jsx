import { 
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAILE,




    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAILE,
     

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAILE,
    // ORDER_PAY_RESET,



    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAILE,
    // ORDER_LIST_MY_RESET,



    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAILE,
    


    ORDER_DELIVERED_REQUEST,
    ORDER_DELIVERED_SUCCESS,
    ORDER_DELIVERED_FAILE,
    ORDER_DELIVERED_RESET,
    } from '../constants/OrderConstant'


import axios from 'axios'

import { CART_CLEAR_ITEMS } from '../constants/cartConstants'



export  const  createOrder= ( order ) => async (dispatch,getState) => {
    try{
        dispatch({
            type:ORDER_CREATE_REQUEST,
    })

    const {
        userLogin : { userInfo },
    }=getState()



    const config = {
        headers:{
            'Content-type':'application/json',
            Authorization  :`Bearer ${userInfo.token}`
        }

    }
    const {data} = await axios.post(
        `/api/orders/add/`,
        order,
        config
        )
    
    dispatch({
        type:ORDER_CREATE_SUCCESS,
        payload:data,
    })


    dispatch({
        type:CART_CLEAR_ITEMS,
        payload:data,
    })
    

    localStorage.removeItem('cartItems')

    


    }
    catch(error){
        dispatch({
            type:    ORDER_CREATE_FAILE,
            payload:error.response && error.response.data.detail
            ?
            error.response.data.detail:
            error.detail,
        })
    }
}





export  const  getOrderDetails= ( id ) => async (dispatch,getState) => {
    try{
        dispatch({
            type:ORDER_DETAILS_REQUEST,
    })

    const {
        userLogin : { userInfo },
    } = getState()



    const config = {
        headers:{
            'Content-type':'application/json',
            Authorization  :`Bearer ${userInfo.token}`
        }

    }
    const {data} = await axios.get(
        `/api/orders/${id}/`,
        config
        )
    
    // console.log('data from backend',data)
    dispatch({
        
        type:ORDER_DETAILS_SUCCESS,
        payload:data,
        
    })
    }
    catch(error){
        dispatch({
            type:    ORDER_DETAILS_FAILE,
            payload:error.response && error.response.data.detail
            ?
            error.response.data.detail:
            error.detail,
        })
    }
}






export  const  payOrder= ( id,paymentResult ) => async (dispatch,getState) => {
    try{
        dispatch({
            type:ORDER_PAY_REQUEST,
        })

        const {
            userLogin : { userInfo },
        } = getState()



        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization  :`Bearer ${userInfo.token}`
            }

        }
        const {data} = await axios.put(
            `/api/orders/${id}/pay/`,
            paymentResult,
            config
            )
        
        dispatch({
            type:ORDER_PAY_SUCCESS,
            payload:data,
        })
    }   
    catch(error){
        dispatch({
            type:    ORDER_PAY_FAILE,
            payload:error.response && error.response.data.detail
            ?
            error.response.data.detail:
            error.detail,
        })
    }
}


















export  const  listMyOrders= ( ) => async (dispatch,getState) => {
    try{
        dispatch({
            type:ORDER_LIST_MY_REQUEST,
    })

    const {
        userLogin : { userInfo },
    } = getState()



    const config = {
        headers:{
            'Content-type':'application/json',
            Authorization  :`Bearer ${userInfo.token}`
        }

    }
    const {data} = await axios.get(
        // console.log('the product id is :',id)
        `/api/orders/myorders/`,
        config
        )
    
    dispatch({
        type:ORDER_LIST_MY_SUCCESS,
        payload:data,
    })





    }
    catch(error){
        dispatch({
            type:    ORDER_LIST_MY_FAILE,
            payload:error.response && error.response.data.detail
            ?
            error.response.data.detail:
            error.detail,
        })
    }
}








export  const  listOrders= ( ) => async (dispatch,getState) => {
    try{
        dispatch({
            type:ORDER_LIST_REQUEST,
    })

    const {
        userLogin : { userInfo },
    } = getState()



    const config = {
        headers:{
            'Content-type':'application/json',
            Authorization  :`Bearer ${userInfo.token}`
        }

    }
    const {data} = await axios.get(
        
        `/api/orders/`,
        config
        )
    
    dispatch({
        type:ORDER_LIST_SUCCESS,
        payload:data,
    })





    }
    catch(error){
        dispatch({
            type:    ORDER_LIST_FAILE,
            payload:error.response && error.response.data.detail
            ?
            error.response.data.detail:
            error.detail,
        })
    }
}









export  const  deliverOrder= ( order ) => async (dispatch,getState) => {
    try{
        dispatch({
            type:ORDER_DELIVERED_REQUEST,
        })

        const {
            userLogin : { userInfo },
        } = getState()



        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization  :`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(
            `/api/orders/${order._id}/delivered/`,
            {},
            config
            )
        
        dispatch({
            type:ORDER_DELIVERED_SUCCESS,
            payload:data,
        })
    }   
    catch(error){
        dispatch({
            type:    ORDER_DELIVERED_FAILE,
            payload:error.response && error.response.data.detail
            ?
            error.response.data.detail:
            error.detail,
        })
    }
}

