
import {Link} from "react-router-dom"
import React from 'react'
import { Nav, Container, Navbar } from 'react-bootstrap';
import hireMe from '../../assets/hireMe.png';
import './Dashboard.css'

function Dashboard() {
    return (
        

        <Navbar bg="light" variant="dark"  >
            <Container>
                <Navbar.Brand href="#home" >
                <img src={hireMe} className="logo1" ></img>
                    <label className="barText" >HireMe - ADMIN</label>
                </Navbar.Brand>
                <Nav className="me-auto">  
                   <Link to ="/AdminPanel"> <label className="barText1" > Admin Panel </label></Link> 
                    <Link to="/CarDetails"> <label className="barText1" >Car Details</label></Link>
                    <Link to="/Supplier"><label className="barText1" >Supplier</label></Link>
                  
                </Nav>
            </Container>
        </Navbar>

    )
}

export default Dashboard
