import { createStore,combineReducers,applyMiddleware } from 'redux'
import thunk  from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {productListReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productReviewCreateReducer ,
    productTopRatedReducer,
    productCategoryReducer,
    companyRegisterReducer,
    companyDetailsReducer,
    companyProductsDetailsReducer ,

    } from './reducers/productReducers'
import { cartReducer, } from './reducers/cartReducers'
import { userLoginReducer } from './reducers/userReducers'
import { userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer } from './reducers/userReducers'
import { 
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderListMyReducer,
    orderListReducer,
    ordeDeliveredReducer,
     } from './reducers/orderReducer'

const reducer = combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    orderCreate : orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay:orderPayReducer,
    orderListMy:orderListMyReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,
    orderList:orderListReducer, 
    orderDelivered : ordeDeliveredReducer,
    productReviewCreate:productReviewCreateReducer,
    productTopRated:productTopRatedReducer,    
    productCategory:productCategoryReducer,
    companyRegister:companyRegisterReducer,
    companyDetails :companyDetailsReducer,
    companyProducts:companyProductsDetailsReducer,

})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) :[]


const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}




const initialState =  {
    cart:{
        cartItems:cartItemsFromStorage,
        shippingAddress:shippingAddressFromStorage,
    },
    userLogin:{userInfo:userInfoFromStorage},
    userLogin: { userInfo: userInfoFromStorage },
    companyProducts: {
      
      products: [], 
      
    },

}



const middleware = [thunk]



const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))




export default store




























