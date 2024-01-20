import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,


    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,
                       

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,




    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
                                    
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,




    PRODUCT_CATEGORY_REQUEST,
    PRODUCT_CATEGORY_SUCCESS,
    PRODUCT_CATEGORY_FAIL,





    COMPANY_CREATE_REQUEST,
    COMPANY_CREATE_FAIL,
    COMPANY_CREATE_SUCCESS,


    COMPANY_DETAILS_REQUEST,
    COMPANY_DETAILS_FAIL,
    COMPANY_DETAILS_SUCCESS,

    COMPANY_PRODUCTS_REQUEST,
    COMPANY_PRODUCTS_FAIL,
    COMPANY_PRODUCTS_SUCCESS,
} from '../constants/productConstants'



import axios from 'axios'

export const listProducts = (keyword = "") => async (dispatch) => {
    try{
        // console.log('api called before list products')
        dispatch({type:PRODUCT_LIST_REQUEST})
        const { data } = await axios.get(`/api/products${keyword}`)
        // console.log('api called after',data)
        dispatch({
            type:PRODUCT_LIST_SUCCESS,
            payload:data,
        })
        
    }catch(error){
        // console.error('Error in API call:', error)
        dispatch({
            type:PRODUCT_LIST_FAIL,
            payload:error.response && error.response.data.detail
            ?
            error.response.data.detail:
            error.detail,
        })
    }
}




export const listTopProducts = () => async (dispatch) => {
    try{
        // console.log('api called before top products')
        dispatch({type:PRODUCT_TOP_REQUEST})
        const { data } = await axios.get(`/api/products/top/`)
        // console.log('api called after',data)
        dispatch({
            type:PRODUCT_TOP_SUCCESS,
            payload:data,
        })
        
    }catch(error){
        // console.error('Error in API call:', error)
        dispatch({
            type:PRODUCT_TOP_FAIL,
            payload:error.response && error.response.data.detail
            ?
            error.response.data.detail:
            error.detail,
        })
    }
}




export const listProductDetails = (id) => async (dispatch) => {
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST})
        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data,
        })
        
    }catch(error){
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response && error.response.data.detail
            ?
            error.response.data.detail:
            error.detail,
        })
    }
}







export  const  deleteProduct= (id) => async (dispatch,getState) => {
    try{
        dispatch({
            type:PRODUCT_DELETE_REQUEST,
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
    const {data} = await axios.delete(
        // console.log('the product id is :',id)
        `/api/products/delete/${id}`,
        config
        )
    
    dispatch({
        type:PRODUCT_DELETE_SUCCESS,
    })
    }
    catch(error){
        dispatch({
            type:    PRODUCT_DETAILS_FAIL,
            payload:error.response && error.response.data.detail
            ?
            error.response.data.detail:
            error.detail,
        })
    }
}





export  const  createProduct= () => async (dispatch,getState) => {
    try{
        dispatch({
            type:PRODUCT_CREATE_REQUEST,
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
    const {data} = await axios.post(
        // console.log('the product id is :',id)
        `/api/products/create/`,
        {},
        config
        )
    
    dispatch({
        type:PRODUCT_CREATE_SUCCESS,
        payload:data,
    })
    }
    catch(error){
        dispatch({
            type:    PRODUCT_CREATE_FAIL,
            payload:error.response && error.response.data.detail
            ?
            error.response.data.detail:
            error.detail,
        })
    }
}






export  const  updateProduct= (product) => async (dispatch,getState) => {
    try{
        dispatch({
            type:PRODUCT_UPDATE_REQUEST,
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
        `/api/products/update/${product._id}/`,
        product,
        config,
        )
    
    dispatch({
        type:PRODUCT_UPDATE_SUCCESS,
        payload:data,
    })

    dispatch({
        type:PRODUCT_DETAILS_SUCCESS,
        payload:data
    })
    }
    catch(error){
        dispatch({
            type:    PRODUCT_UPDATE_FAIL,
            payload:error.response && error.response.data.detail
            ?
            error.response.data.detail:
            error.detail,
        })
    }
}


export  const  createProductReview= (productId,review) => async (dispatch,getState) => {
    try{
        dispatch({
            type:PRODUCT_CREATE_REVIEW_REQUEST,
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
    const {data} = await axios.post(
        `/api/products/${productId}/reviews/`,
        review,
        config,
        )
    
    dispatch({
        type:PRODUCT_CREATE_REVIEW_SUCCESS,
        payload:data,
    })


    }
    catch(error){
        dispatch({
            type:    PRODUCT_CREATE_REVIEW_FAIL,
            payload:error.response && error.response.data.detail
            ?
            error.response.data.detail:
            error.detail,
        })
    }
}




export const listProductsByCategory = (category) => async (dispatch) => {
    try{
        dispatch({type:PRODUCT_CATEGORY_REQUEST})
        const { data } = await axios.get(`/api/products/category/${category}`)

        dispatch({
            type:PRODUCT_CATEGORY_SUCCESS,
            payload:data,
        })
        
    }catch(error){
        dispatch({
            type:PRODUCT_CATEGORY_FAIL,
            payload:error.response && error.response.data.detail
            ?
            error.response.data.detail:
            error.detail,
        })
    }
}







export  const  registerCompany = (companyName,aboutCompany) => async (dispatch,getState) => {
    try{
        dispatch({
            type:COMPANY_CREATE_REQUEST,
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
    const {data} = await axios.post(
        '/api/products/company/',
        {'companyName':companyName,'aboutCompany':aboutCompany},
        config
        )
        dispatch({
            type: COMPANY_CREATE_SUCCESS,
            payload: data,
        });
    }
    catch(error){
        dispatch({
            type:    COMPANY_CREATE_FAIL,
            payload:error.response && error.response.data.detail
            ?
            error.response.data.detail:
            error.detail,
        })
    }
}





export  const  companyDetails= () => async (dispatch,getState) => {
    try{
        dispatch({
            type:COMPANY_DETAILS_REQUEST,
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
            `/api/products/company/seller`,
            config
            )
        
        dispatch({
            type:COMPANY_DETAILS_SUCCESS,
            payload: { companyDetails: data },
        })
    }   
    catch(error){
        dispatch({
            type:    COMPANY_DETAILS_FAIL,
            payload:error.response && error.response.data.detail
            ?
            error.response.data.detail:
            error.detail,
        })
    }
}






export  const  getProductsByCompany= () => async (dispatch,getState) => {
    try{
        dispatch({
            type:COMPANY_PRODUCTS_REQUEST,
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
        console.log("getProductsByCompany is triggred")
        const {data} = await axios.get(
            `/api/products/company/seller/products`,
            config
            )
        
        dispatch({
            type:COMPANY_PRODUCTS_SUCCESS,
            payload: { companyDetails: data },
        })
    }   
    catch(error){
        dispatch({
            type:    COMPANY_PRODUCTS_FAIL,
            payload:error.response && error.response.data.detail
            ?
            error.response.data.detail:
            error.detail,
        })
    }
}
