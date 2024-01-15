import React,{ useEffect,useState } from 'react'
import { Link,useLocation,useNavigate } from 'react-router-dom'
import { Form,Button,Col,Row } from 'react-bootstrap'
import  Loader   from '../components/Loader'
import  Message   from '../components/Message'
import { useDispatch,useSelector } from 'react-redux'
import { registerCompany,companyDetails } from '../actions/productActions'
import  FormContainer   from '../components/FormContainer'

function SellerDetailsScreen() {
    

    const companyDetailsFromSelector = useSelector(state => state.companyDetails)
    const {companyDetails:{ companyName,aboutCompany}} = companyDetailsFromSelector
    console.log('company op is ',companyName,aboutCompany)

  return (
    <div>
      <h1>Seller Details</h1>
    </div>
  )
}

export default SellerDetailsScreen
