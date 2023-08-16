import {store} from '../app/store';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect,useState } from 'react'
import categoryService from '../services/category/categoryService';
import { useSelector, useDispatch } from 'react-redux'
import { saveCategories } from '../services/category/categorySlice';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import AliceCarousel from 'react-alice-carousel';
import { useNavigate } from 'react-router-dom'

// 1- react hooks page loaded 
// 2- get categories from the backend using cat Service
// 3- save to store and in state
// 4 - display categories on the page
function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

    const { user,token } = useSelector(
    (state) => state.auth?.user
  )
  const [categories, setCategories] = useState([])
  console.log(user);
  useEffect(() => {
    console.log('loaded');
     categoryService.index().then((response)=>{
      dispatch(saveCategories(response.categories))
      setCategories(response.categories)
    }) 
  }, [])
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  )
  const handleDragStart = (e) => e.preventDefault();

  const selectCategory = async (category) => {
    try {
      navigate(`/products`,{state:{category:category}})
    } catch (error) {
        console.log(error);
    }
  
  }
  // const items = [
  //   <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
  //   <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
  //   <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
  // ];
  const responsive = {
    0: { items:3 },
    568: { items: 3 },
    1024: { items: 3 },
};
  const items = categories.map((category)=>{
    return <Col> <Card className='btn'  onClick={()=>{selectCategory(category)}} onDragStart={handleDragStart} role="presentation" body>{category.name}</Card></Col>;
  })
  
    return (
    <div>
      <AliceCarousel mouseTracking items={items} responsive={responsive} disableButtonsControls={true} disableDotsControls={true}/>
     {/* <Card style={{ width: '18rem' }}>
      <ListGroup variant="flush">
        {
          categories.map((category)=>{
            return <ListGroup.Item >{category.name}</ListGroup.Item>
          })
        }
      </ListGroup>
    </Card> */}
    <Container fluid>
    {/* <Row>
    {
          products.map((product)=>{
            return <Col> 
            <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.image} />
      <Card.Body>
        <Card.Title>{product.name}  {product.price}</Card.Title>
        <Card.Text>
          {product.description}
        </Card.Text>
        <Button variant="primary">Add to cart</Button>
      </Card.Body>
    </Card>
            </Col>
          })
        }
      
      </Row> */}
      </Container>
    </div>
    
  )
}

export default Home