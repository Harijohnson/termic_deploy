import React,{useState} from 'react'
import { Button,Form } from 'react-bootstrap'
import { useParams,useNavigate } from 'react-router-dom'

function SearchBox() {
    
    const [keyword,setKeyword] = useState('')


    let navigate  = useNavigate()

    const submitHandler = (e) =>{
        e.preventDefault()

        if(keyword){
            navigate(`/?keyword=${keyword}&page=1`)
        }else{
            navigate(window.location.pathname);
        }
    }



  return (
    <Form  onSubmit={submitHandler} inline='true'  className="d-flex align-items-center">
      <Form.Control
      type='text'
      name = 'q'
      onChange={(e)=>setKeyword(e.target.value)}
      className='me-2'
      placeholder='Search'
      ></Form.Control>


        <Button 
        type='submit'
        variant='outline-success'
        className='me-2'
        >
           
           <i className='fas fa-search' ></i>
        </Button>
    </Form>
  )
}

export default SearchBox
