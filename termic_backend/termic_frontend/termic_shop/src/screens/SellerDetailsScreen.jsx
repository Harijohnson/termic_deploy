import React,{ useEffect,useState } from 'react'
import { Link, useLocation,useNavigate,useParams } from 'react-router-dom'
import { Form,Button,Col,Row,Dropdown } from 'react-bootstrap'
import  Loader   from '../components/Loader'
import  Message   from '../components/Message'
import { useDispatch,useSelector } from 'react-redux'
import { listProductDetails, updateProduct,companyDetails } from '../actions/productActions'
import  FormContainer   from '../components/FormContainer'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import  axios  from 'axios'
import { Carousel } from 'react-bootstrap';


function SellerDetailsScreen() {
    const navigate = useNavigate()
     
    const userLogin = useSelector((state)=>state.userLogin)
    const { userInfo } = userLogin
    const dispatch = useDispatch()
    
    useEffect (() => {
        if (!userInfo){
            navigate('/login')
            // console.log("s")
        }else{
            dispatch(companyDetails());
        }
    },[navigate,userInfo,dispatch])
    const companyDetailsFromSelector = useSelector(state => state.companyDetails)
    const {companyDetails:{ companyName:companyNameBackend,aboutCompanyBackend:abtCom}={}} = companyDetailsFromSelector



  return (
    <div>

    <Link to='/admin/productlist'>Go Back</Link>

</div>

)

}

export default SellerDetailsScreen
