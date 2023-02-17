import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Card from 'react-bootstrap/Card';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import menuImage1 from "../../assets/img/sheet2.svg";
import menuImage2 from "../../assets/img/sheet1.svg";

import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Homepage() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        _id: "",
        email: "",
        password: ""
    });
    let foundUser = {};
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            foundUser = JSON.parse(loggedInUser);
            console.log('homepage');
            console.log(foundUser);
            setUser(foundUser);
            /*setUser({
                ...foundUser,
            });*/
            //console.log(user._id);
            //console.log(user);
        }
    }, []);
    const navigateDataUpload = ()=>{
        navigate('/capacity/upload');
    };
    const navigateDataDisplay = ()=>{
        navigate('/capacity');
    };
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
                    <Nav.Link onClick={navigateDataUpload}>Carga de datos</Nav.Link>
                    <Nav.Link onClick={navigateDataDisplay}>Modificar datos</Nav.Link>
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
                    <Card onClick={navigateDataUpload}>
                        <Card.Img variant="top" className="mx-auto d-block" src={menuImage1} style={{ height: '55px', width: '55px', marginTop: 'var(--bs-card-spacer-y)' }} />
                        <Card.Body className="text-center">
                            <Card.Text>
                                Carga de datos
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card onClick={navigateDataDisplay}>
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
