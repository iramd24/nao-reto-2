import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Card from 'react-bootstrap/Card';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import * as XLSX from "xlsx";
import axios from 'axios';

function DataUpload() {
    const navigate = useNavigate();
    const [capacities, setCapacities] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
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
            console.log('dataUpload');
            console.log(foundUser);
            setUser(foundUser);
            //console.log(user._id);
            //console.log(user);
        }
    }, []);

    const readExcel = (e) => {
        e.preventDefault();
        const promise = new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsArrayBuffer(selectedFile);
    
          fileReader.onload = (e) => {
            const bufferArray = e.target.result;
    
            const wb = XLSX.read(bufferArray, { type: "buffer" });
    
            const wsname = wb.SheetNames[0];
    
            const ws = wb.Sheets[wsname];
    
            const data = XLSX.utils.sheet_to_json(ws);
    
            resolve(data);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
    
        promise.then((d) => {
          upload(d);
        });
      };
    const upload = (data) => {
        
        console.log(data);
        axios.post("http://localhost:5000/uploadCapacities", data )
            .then(res => {
                alert(res.data.message);
                localStorage.setItem('localCapacities', JSON.stringify(data));
                navigateDataDisplay();
            }).catch( (err)=>{ console.log(err)});
    };
    const navigateHome= ()=>{
        navigate('/');
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
                        <Nav.Link onClick={navigateHome}>Home</Nav.Link>
                        <Nav.Link href="#load">Carga de datos</Nav.Link>
                        <Nav.Link onClick={navigateDataDisplay}>Modificar datos</Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            {user.email}
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container fluid>
                <Row className='d-flex justify-content-center align-items-center h-100'>
                    <Col>
                        <Card className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
                            <Card.Body className='p-5 w-100 d-flex flex-column'>
                                <h2 className="fw-bold mb-2 text-center">Carga de datos</h2>
                                <Form action="#">
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Seleccionar Archivo</Form.Label>
                                        <Form.Control type="file" placeholder="Archivo.xlsx" name="file"  onChange={(e) => setSelectedFile(e.target.files[0])}/>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" onClick={readExcel}>
                                        Subir
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

export default DataUpload;
