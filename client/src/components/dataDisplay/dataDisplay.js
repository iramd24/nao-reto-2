import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import * as XLSX from "xlsx";
import axios from 'axios';

function DataDisplay() {
    const navigate = useNavigate();
    const [capacities, setCapacities] = useState(JSON.parse(localStorage.getItem("localCapacities")) || []);
    const [isDocEdited, setDocEdited] = useState(null);
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
            console.log('dataDisplay');
            console.log(foundUser);
            setUser(foundUser);
            getData();
        }
    }, []);
    const onChangeInput = (e, rowId) => {
        const { name, value } = e.target
        console.log('name', name);
        console.log('value', value);
        console.log('rowId', rowId);
      
        const editData = capacities.map((cap) =>
          cap._id === rowId && name ? { ...cap, [name]: value } : cap
        );
      
        console.log('editData', editData);
      
        setDocEdited(true);
        setCapacities(editData);
    }
    const upload = (e) => {
        e.preventDefault();
        console.log(capacities);
        axios.post("http://localhost:5000/uploadCapacities", capacities)
            .then(res => {
                alert(res.data.message);
                localStorage.setItem('localCapacities', JSON.stringify(capacities));
                //navigateDataDisplay();
            }).catch((err) => { console.log(err) });
    };
    const getData = () => {
        axios.get("http://localhost:5000/getCapacities")
            .then(res => {
                console.log('getData');
                console.log(res.data);
                setCapacities(res.data.capacities);
            }).catch((err) => { console.log(err) });
    };
    const navigateHome = () => {
        navigate('/');
    };
    const navigateDataUpload = () => {
        navigate('/capacity/upload');
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
                        <Nav.Link onClick={navigateDataUpload}>Carga de datos</Nav.Link>
                        <Nav.Link href="#mod">Modificar datos</Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            {user.email}
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container style={{ textAlign:'left'}}>
                <Button className={isDocEdited ? 'rounded bg-white mt-5' : 'rounded bg-white mt-5 disabled'} variant="light"  onClick={upload}>Guardar cambios</Button>
            </Container>
            <Container>
                <Table striped hover responsive size="sm" className='rounded bg-white my-5'>
                    <thead><tr><th>branch</th>
                        <th>business_unit</th>
                        <th>planned_released</th>
                        <th>firmwo</th>
                        <th>plannedwo</th>
                        <th>daily_capacity</th>
                        <th>weekly_capacity</th>
                        <th>mothly_capacty</th>
                        <th>month_description_effective_from</th>
                        <th>effective_from</th>
                        <th>week_number_effective_from</th>
                        <th>request_date</th>
                        <th>rate_hour</th>
                        <th>primary_uom_hour</th>
                        <th>short_item_number</th>
                        <th>second_item_number_litm</th>
                        <th>work_order_quantity</th>
                        <th>quantity_ordered_</th>
                        <th>work_order_number</th>
                        <th>wo_status</th>
                        <th>type_of_routing</th>
                        <th>wo_start_date</th></tr></thead><tbody>
                        {
                            capacities.map((cap, index) => (
                                <tr key={cap._id}>
                                    <td>{cap.branch}</td>
                                    <td><input
                                        name="business_unit"
                                        value={cap.business_unit}
                                        type="text"
                                        onChange={(e) => onChangeInput(e, cap._id)}
                                        placeholder="Business Unit"
                                    />
                                    </td>
                                    <td>{cap.planned_released}</td>
                                    <td>{cap.firmwo}</td>
                                    <td>{cap.plannedwo}</td>
                                    <td>{cap.daily_capacity}</td>
                                    <td>{cap.weekly_capacity}</td>
                                    <td>{cap.mothly_capacty}</td>
                                    <td>{cap.month_description_effective_from}</td>
                                    <td>{cap.effective_from}</td>
                                    <td>{cap.week_number_effective_from}</td>
                                    <td>{cap.request_date}</td>
                                    <td>{cap.rate_hour}</td>
                                    <td>{cap.primary_uom_hour}</td>
                                    <td>{cap.short_item_number}</td>
                                    <td>{cap.second_item_number_litm}</td>
                                    <td>{cap.work_order_quantity}</td>
                                    <td>{cap.quantity_ordered_}</td>
                                    <td>{cap.work_order_number}</td>
                                    <td>{cap.wo_status}</td>
                                    <td>{cap.type_of_routing}</td>
                                    <td>{cap.wo_start_date}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default DataDisplay;

//<tfoot>
//                        <td colSpan={2}><button onClick={exportFile}>Export XLSX</button>
//                    </td></tfoot>