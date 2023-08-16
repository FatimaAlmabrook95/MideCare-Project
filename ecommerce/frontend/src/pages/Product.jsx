import { useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect } from 'react'
import { getproductById } from '../services/product/productsSlice'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
function Products() {
  let { id } = useParams();
  const dispatch = useDispatch()
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
)
  useEffect(() => {
    dispatch(getproductById({ id }))
}, [])
  return (
    <Container>
    <Row className="justify-content-center">
      <Col  sm={12} lg={6}>  <Image className="mx-auto" src={product.image} fluid={true} alt="product image" /></Col>
      <Col sm={12} lg={6}>
      <Card style={{ width: '18rem' }}  className="mx-auto">
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
        {product.price}
        </Card.Text>
        <Card.Text>
        {product.description}
        </Card.Text>
        <Button variant="success">Add to cart</Button>
      </Card.Body>
    </Card>
      </Col>
    </Row>
  </Container>
  )
}

export default Products