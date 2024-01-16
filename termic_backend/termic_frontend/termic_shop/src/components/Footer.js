import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
function Footer() {
  return (
    <footer className="mt-auto py-3 bg-light">
        <Container>
            <Row>
                <Col className='text-center'>
                  <p 
                  className="mb-0" > Copyright &copy; Termic Shop
                  </p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer
