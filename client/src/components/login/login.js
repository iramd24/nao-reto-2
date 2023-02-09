import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login({ setLoginUser }) {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,//spread operator 
            [name]: value
        });
    }
    const navigateToHome = ()=>{
        navigate('/');
    };
    const login = (e) => {
        e.preventDefault();
        console.log(user.email +" "+user.password);
        axios.post("http://localhost:5000/loginTest", user)
            .then(res => {
                alert(res.data.message)
                setLoginUser(res.data.user)
                navigateToHome();
            }).catch( (err)=>{ console.log(err)});
            /*axios.post("http://localhost:5000/login/userRegister",user )
            .then(res=>console.log(res))*/
    }
    return (
        <>
            <Container fluid>
                <Row className='d-flex justify-content-center align-items-center h-100'>
                    <Col>
                        <Card className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
                            <Card.Body className='p-5 w-100 d-flex flex-column'>
                                <h2 className="fw-bold mb-2 text-center">Ingresa</h2>
                                <Form action="#">
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Usuario</Form.Label>
                                        <Form.Control type="text" placeholder="Usuario" name="email" value={user.email}  onChange={handleChange}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Contraseña</Form.Label>
                                        <Form.Control type="password" placeholder="Contraseña" name="password" value={user.password}  onChange={handleChange}/>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" onClick={login}>
                                        Ingresar
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Login;
