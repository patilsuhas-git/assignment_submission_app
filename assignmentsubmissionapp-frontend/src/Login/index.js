import React, {useRef, useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";
import ajax from "../Services/fetchService";
import {Button, Col, Container, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [jwt, setJwt] = useLocalState("", "jwt");
    function sendLoginRequest() {
        // console.log("Login clicked");

        const reqBody = {
            "username": username,
            "password": password
        };
        ajax("api/auth/login", "POST", null, reqBody)
        .then((response)=> {
            if(response.status === 200) {
                return Promise.all([response.json(), response.headers]);
            } else {
                return Promise.reject("Invalid Login attempt.");
            }
        })
        .then(([body, headers]) => {
            setJwt(headers.get("authorization"));
            window.location.href = "/dashboard";
        }).catch((message) => {
            alert(message);
        });
    }

    return (
        <>
            <Container className="mt-5">
                <div className="justify-content-center align-item-center">
                    <Row className="justify-content-center align-item-center">
                        <Col md="8" lg="6">
                            <FormGroup className="mb-3 fs-4" controlId="formBasicEmail">
                                <FormLabel >Username</FormLabel>
                                <FormControl type="email"
                                             placeholder="Enter your username here"
                                             value={username || ""}
                                             onChange={
                                                 (e) => setUsername(e.target.value)
                                             }
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row className="justify-content-center align-item-center">
                        <Col md="8" lg="6">
                            <FormGroup className="mb-3 fs-4" controlId="password">
                                <FormLabel>Password</FormLabel>
                                <FormControl type="password"
                                             placeholder="Enter your password here"
                                             value={password}
                                             onChange={(e) => setPassword(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row className="justify-content-center align-item-center">
                        <Col md="8" lg="6" className="mt-3 d-flex flex-column gap-5 flex-md-row justify-content-md-between">
                            <Button id="submit"
                                    type="button"
                                    onClick={() => sendLoginRequest()}
                                    size="lg"
                            >
                                Login
                            </Button>
                            <Button variant="secondary"
                                    type="button"
                                    onClick={() => {window.location.href = "/"}}
                                    size="lg"
                            >
                                Exit
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Container>
        </>
    );
};

export default Login;
