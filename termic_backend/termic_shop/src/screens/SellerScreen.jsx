import React,{ useEffect,useState } from 'react'
import { Link,redirect,useLocation,useNavigate } from 'react-router-dom'
import { Form,Button,Col,Row } from 'react-bootstrap'
import  Loader   from '../components/Loader'
import  Message   from '../components/Message'
import { useDispatch,useSelector } from 'react-redux'
import { registerCompany,companyDetails } from '../actions/productActions'
import  FormContainer   from '../components/FormContainer'
function SellerScreen() {
    
    
    const dispatch = useDispatch()

    const location = useLocation();
    const navigate = useNavigate();

    const userLogin = useSelector(state => state.userLogin)
    const { error,loading,userInfo } = userLogin


    // const [uploading,setUploading] = useState(false)

    // const [logo, setLogo] = useState('');






    useEffect (() => {
        if (!userInfo){
            navigate('/login')
            // console.log("s")
        }else{
            dispatch(companyDetails(userInfo));
        }
    },[navigate,userInfo,dispatch])






    const companyDetailsFromSelector = useSelector(state => state.companyDetails)
    const {companyDetails:{ companyName:companyNameBackend,aboutCompanyBackend:abtCom}={}} = companyDetailsFromSelector

    // const {loadingData, companyDetails: { companyName: companyNameBack, aboutCompany: aboutCompanyBack } } = useSelector(state => state.companyDetails);

    // console.log('companyName and aboutCompany from redux store',comname,abtCom)


    if (companyDetailsFromSelector){
        redirect('/seller/details')
    }


    const [companyName,setCompanyName] = useState('')
    const [aboutCompany,setAboutCompany] = useState('')






    const submitHandeler = ((e)=>
    {
        e.preventDefault()
        dispatch(registerCompany(companyName,aboutCompany,))

    })
  return (
    <>       { !companyNameBackend ? (
              <FormContainer>
                <h1>Create Company</h1>

                {error && <Message variant='danger'>{error}</Message>}
                  {loading && <Loader />}
                <Form onSubmit={ submitHandeler }>
                  <Form.Group controlId='companyname'>
                      <Form.Label>
                          Company Name
                      </Form.Label>
                      <Form.Control 
                      type='text'
                      placeholder='Company Name'
                      value={companyName}
                      onChange={(e)=>setCompanyName(e.target.value)}>

                      </Form.Control>
                  </Form.Group>


                  <Form.Group controlId='aboutcompany'>
                      <Form.Label>
                          About Company
                      </Form.Label>
                      <Form.Control 
                      type='textarea'
                      placeholder='About Company'
                      value={aboutCompany}
                      onChange={(e)=>setAboutCompany(e.target.value)}>

                      </Form.Control>
                  </Form.Group>

                  <Button 
                  type='submit'
                  variant='primary' >
                      Submit
                  </Button>


                </Form>

                {/* <Row className = 'py-3'>
                  <Col>
                  New Customer ? <Link to ={redirect ? `/register?redirect = ${redirect}` : '/register'}>
                      Register
                  </Link>
                  </Col>
                </Row> */}
              </FormContainer>
        )
        :
        (
             <>
             <h3>
             {companyNameBackend}
             </h3></>
             )}
    </>
 
    )
}


export default SellerScreen
