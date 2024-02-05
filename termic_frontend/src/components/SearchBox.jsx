import React,{useState} from 'react'
import { Button,Form, InputGroup } from 'react-bootstrap'
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
    // <Form  onSubmit={submitHandler} className="search-box">
    //   <InputGroup>
      
    //   <Form.Control
    //   type='text'
    //   name = 'q'
    //   onChange={(e)=>setKeyword(e.target.value)}
    //   className="rounded-pill py-2 pe-3"
    //   placeholder='Search'
    //   ></Form.Control>


    //     <Button 
    //     type='submit'
    //     variant='outline-success'
    //     className="rounded-pill py-2 ps-3"
    //     >
           
    //        <i className='fas fa-search' ></i>
    //     </Button>

    //     </InputGroup>
    // </Form>

    <Form onSubmit={submitHandler} className="search-box">
      <InputGroup className="position-relative">
        <Form.Control
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          className="rounded-pill"
          placeholder="Search"
        />
        <Button
          type="submit"
          className="rounded-pill position-absolute top-50 translate-middle-y bg-transparent pointer-events-hover"
          style={{ right: '0', color: 'black', border: 'none', zIndex: 1 }}
        >
          <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>

  )
}

export default SearchBox
