import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Card from 'react-bootstrap/Card';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import menuImage1 from "../../assets/img/sheet2.svg";
import menuImage2 from "../../assets/img/sheet1.svg";

import { useState } from 'react';


function Homepage() {
    const [user, setLoginUser] = useState({
    });
    return (
        <>
            <Navbar bg="light" variant="light">
                <Container fluid>
                    <Navbar.Brand href='#'>
                        <img
                            src='https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.webp'
                            height='30'
                            alt=''
                            loading='lazy'
                        />{' '}
                        Capacity Planner
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#load">Carga de datos</Nav.Link>
                        <Nav.Link href="#mod">Modificar datos</Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            {user.email}
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <Row className='my-5'>
                    <Col>
                        <Card>
                            <Card.Img variant="top" className="mx-auto d-block" src={menuImage1} style={{ height: '55px', width: '55px', marginTop: 'var(--bs-card-spacer-y)' }} />
                            <Card.Body className="text-center">
                                <Card.Text>
                                    Carga de datos
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card >
                            <Card.Img variant="top" className="mx-auto d-block" src={menuImage2} style={{ height: '55px', width: '55px', marginTop: 'var(--bs-card-spacer-y)' }} />
                            <Card.Body className="text-center">
                                <Card.Text>
                                    Modificación de datos
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
            </Container>
        </>
    );
}

export default Homepage;
