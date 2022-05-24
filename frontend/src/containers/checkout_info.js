import React, { useState, useEffect } from 'react';
import Form from "react-bootstrap/Form";
import { Row, Col } from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';
import './checkout_info.css';
import { useSelector, useDispatch } from "react-redux";
import {DATACLEAN} from '../redux/actionTypes';

import { get_user_details } from "../client/food"

export default function Checkout_info() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [namecard, setNamecard] = useState("");
    const [cardnumber, setCardnumber] = useState("");
    const dispatch = useDispatch();

    const nav = useNavigate();

    const [userDetails, setUserDetails] = useState({
        "address": "200 Univ. Ave. Waterloo ON N2L0H6 CA",
        "email": "user_email@gmail.com",
        "first_name": "Fname",
        "last_name": "Lname",
        "msg": "Success",
        "phone_number": "999999999",
        "success": true
    });

    useEffect(() => {
        get_user_details().then(
            (res) => {
                setUserDetails(res.data);
            }
        );
    }, []);

    const after_checkout=()=>{
        dispatch({type:DATACLEAN});
        nav('/checkout');
    }

    return (
        <div className='checkout_fill'>
            <div className='title'>
                <div>Checkout</div>
            </div>

            <div className="info_form">
                <Form onSubmit={()=>after_checkout()}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="name">
                            <Form.Label>Full name</Form.Label>
                            <Form.Control required type="name" placeholder="Enter name" value={userDetails.first_name + " " + userDetails.last_name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="phone">
                            <Form.Label>phone number</Form.Label>
                            <Form.Control required type="phone" placeholder="Phone number" value={userDetails.phone_number} onChange={(e) => setPhone(e.target.value)} />
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control required placeholder="1234 Main St" value={userDetails.address} onChange={(e) => setAddress(e.target.value)} />
                    </Form.Group>

                    {/* <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control required value={city} onChange={(e) => setCity(e.target.value)} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>State</Form.Label>
                            <Form.Select>
                                <option>NL</option>
                                <option>PE</option>
                                <option>NS</option>
                                <option>QC</option>
                                <option>ON</option>
                                <option>MB</option>
                                <option>SK</option>
                                <option>AB</option>
                                <option>BC</option>
                                <option>YT</option>
                                <option>NT</option>
                                <option>NU</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Postal code</Form.Label>
                            <Form.Control required />
                        </Form.Group>
                    </Row> */}

                    <Form.Group className="mb-3" size="lg" controlId="name_on_card">
                        <Form.Label>Payment Information</Form.Label>
                        <Form.Control
                            autoFocus
                            type="name_on_card"
                            value={userDetails.first_name + " " + userDetails.last_name}
                            required
                            placeholder="Name on card"
                            onChange={(e) => setNamecard(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" size="lg" controlId="card_number">
                        <Form.Control
                            autoFocus
                            type="card_number"
                            value={cardnumber}
                            required
                            placeholder="Card number"
                            onChange={(e) => setCardnumber(e.target.value)}
                        />
                    </Form.Group>

                    <Row className='mb-3'>
                        <Col>
                            <Form.Select>
                                <option>01</option>
                                <option>02</option>
                                <option>03</option>
                                <option>04</option>
                                <option>05</option>
                                <option>06</option>
                                <option>07</option>
                                <option>08</option>
                                <option>09</option>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Select>
                                <option>2022</option>
                                <option>2023</option>
                                <option>2024</option>
                                <option>2025</option>
                                <option>2026</option>
                                <option>2027</option>
                                <option>2028</option>
                                <option>2029</option>
                                <option>2030</option>
                                <option>2031</option>
                                <option>2032</option>
                                <option>2033</option>
                                <option>2034</option>
                                <option>2035</option>
                                <option>2036</option>
                                <option>2037</option>
                                <option>2038</option>
                                <option>2039</option>
                                <option>2040</option>
                                <option>2041</option>
                                <option>2042</option>
                            </Form.Select>
                        </Col>
                    </Row>

                    <Button type="submit" className='mt-3'>
                        Checkout
                    </Button>
                </Form>
            </div>
        </div>
    );
}