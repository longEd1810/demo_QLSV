import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import Image from '../../components/Image';
import Loading from '../../components/Loading';
import url from '../../jsconfig';
import { loginUser } from '../../redux/action/ActionCreator/UserCreator';
export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    function validateForm() {
        return email.includes('@') && password.length > 4;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newUser = {
            email: email,
            password: password,
        };
        setIsLoading(true);
        let user = await axios.post(`${url.SERVER_URL}/api/login`, newUser);

        if (user.data.code === 200) {
            const { access_token, ...other } = user.data;
            localStorage.setItem('user', JSON.stringify(other));
            localStorage.setItem('access_token', JSON.stringify(access_token));
            localStorage.setItem('role_symbol', JSON.stringify(other.role_symbol));
            dispatch(loginUser(other));
            navigate('/home');
        } else {
            setCode(user.data.code);
            setMessage(user.data.message);
        }
        setIsLoading(false);
    };

    return (
        <Container className="Login">
            <Row>
                <Col lg={3}>
                    <Row>
                        <Col lg={3}>
                            <Link to={'/'}>
                                <Image isLogo alt={'logo'} />
                            </Link>
                        </Col>
                        <Col lg={9} className="d-flex justify-content-center align-items-center">
                            <Link to={'/'}>
                                <h5 className="text-primary navbar-brand-name fw-bold">Quản Lý Sinh Viên</h5>
                            </Link>
                        </Col>
                    </Row>
                </Col>
                <Col lg={5}></Col>
                <Col lg={4}></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group size="lg" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                autoFocus
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        {code !== 200 && <div className="text-danger">{message}</div>}

                        <Row>
                            <Col>
                                <Button
                                    block="true"
                                    size="lg"
                                    type="submit"
                                    disabled={!validateForm()}
                                    className="mt-3"
                                >
                                    Login
                                </Button>
                            </Col>
                            <Col className="mt-3">{isLoading && <Loading />}</Col>
                        </Row>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
}
