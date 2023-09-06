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
                <FormGroup className="mb-3 fs-4" controlId="formBasicEmail">
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <FormControl type="email"
                           id="username"
                           placeholder="Enter your username here"
                           value={username || ""}
                           onChange={
                               (e) => setUsername(e.target.value)
                           }
                    />
                </FormGroup>
                <FormGroup className="mb-3 fs-4" controlId="formBasicEmail">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl type="password"
                           id="password"
                           placeholder="Enter your password here"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                    />
                </FormGroup>
                <Button id="submit"
                        className="mt-3"
                        type="button"
                        onClick={() => sendLoginRequest()}
                        size="lg"
                >
                    Login
                </Button>
            </Container>
        </>
    );
};

export default Login;
