import { useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState} from 'react'
import { getproducts } from '../services/product/productsSlice'
import {addProduct} from "../services/cart/cartSlice"
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

function Products() {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const { category } = location.state
    useEffect(() => {
        dispatch(getproducts({ filter: { category: location.state.category._id } }))
    }, [])
    const { products, isLoading, isError, message } = useSelector(
        (state) => state.product
    )
    const selectProduct = async (product) => {
        try {
          navigate(`/product/${product._id}`)
        } catch (error) {
            console.log(error);
        }
      
      }

      const [sort, setSort] = useState({})
      useEffect(() => {
        dispatch(getproducts({ filter: { category: location.state.category._id ,sort:sort} }))
    }, [sort])

    const addToCart = async (product)=>{
        try {
            dispatch(addProduct(product))
            // check if user has cart
            // dispatch(createCart({}))
        } catch (error) {
            console.log(error);
        }

    } 
    return (

        <div>
            <Container fluid>
            <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>{category.name} الصنف: </Navbar.Brand>
        <Nav.Link >عدد المنتجات: {products.length}</Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"  className="justify-content-end">
        <Navbar.Text>
          <Nav className="me-auto">
            <NavDropdown title="ترتيب حسب" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={()=>{setSort('price')}}>السعر تصاعدي</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{setSort('-price')}}>
              السعر تنازلي
              </NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{setSort('createdAt')}} >تاريخ الإضافة</NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
            </NavDropdown>
          </Nav>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
                <Row>
                    {
                        products.map((product) => {
                            return <Col>
                                <Card style={{ width: '18rem', cursor: 'pointer' }}>
                                    <Card.Img onClick={()=>{selectProduct(product)}} variant="top" src={product.image} />
                                    <Card.Body>
                                        <Card.Title onClick={()=>{selectProduct(product)}}>{product.name}  {product.price}</Card.Title>
                                        <Card.Text onClick={()=>{selectProduct(product)}} >
                                            {product.description}
                                        </Card.Text>
                                        <Button onClick={()=>{addToCart(product)}} variant="primary">Add to cart</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        })
                    }

                </Row>
            </Container>
        </div>
    )
}

export default Products