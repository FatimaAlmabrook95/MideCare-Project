import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { getproducts } from '../services/product/productsSlice'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react'

function Header() {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    search: '',
})
const { search } = formData
const onChange = (e) => {
  setFormData((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value,
  }))
}

const onSubmit = async (e) => {
  try {
      e.preventDefault()
      dispatch(getproducts({ search }))
  } catch (error) {
      console.log(error);
  }

}
  return (
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Logo</Navbar.Brand>
          <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Nav.Link> 
            {' '}
            <Link className="nav-link" to="/">
                home
              </Link>
             </Nav.Link>
            <Nav.Link>
            {' '}
            <Link className="nav-link" to="/login">
            login
              </Link>
              </Nav.Link>
            <Nav.Link>
            {' '}
            <Link className="nav-link" to="/register">
            Register
              </Link>
            </Nav.Link>
          </Nav>
          <Form onSubmit={onSubmit} className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              name="search"
              aria-label="Search"
              onChange={onChange}
            />
            <Button  type="submit" variant="outline-success">Search</Button>
          </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar> 
  )
}

export default Header