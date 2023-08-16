import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaUser } from 'react-icons/fa'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux'
import { saveUser } from '../services/auth/authSlice';
import authService from '../services/auth/authService'
import { useNavigate } from 'react-router-dom'

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user } = useSelector(
        (state) => state.auth
      )
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const { email, password } = formData
    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
    const onSubmit = async (e) => {
        try {
            e.preventDefault()
                const sentUser = {
                    email,
                    password
                }
    let recievedUser = await authService.login(sentUser)
        dispatch(saveUser(recievedUser))
        navigate('/')
        } catch (error) {
            console.log(error);
        }
     
    }
    return (
        <>
            <Row className="justify-content-md-center">
                <Col mx='auto' xs={12} md={4}>
                    <Card>
                        <Card.Header>Login</Card.Header>
                        <Card.Body>
                            <Form onSubmit={onSubmit}>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        name='email'
                                        value={email}
                                        placeholder="email"
                                        aria-label="email"
                                        aria-describedby="basic-addon2"
                                        onChange={onChange}
                                    />
                                    <InputGroup.Text id="basic-addon2">@</InputGroup.Text>
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        name='password'
                                        value={password}
                                        placeholder="password"
                                        aria-label="password"
                                        type='password'
                                        aria-describedby="basic-addon2"
                                        onChange={onChange}
                                    />
                                    <InputGroup.Text id="basic-addon2">@</InputGroup.Text>
                                </InputGroup>
                                <Button type="submit">Submit</Button>

                            </Form>
                        </Card.Body>

                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Login