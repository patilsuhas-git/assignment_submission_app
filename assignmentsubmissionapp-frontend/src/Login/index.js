import React, {useRef, useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";
import ajax from "../Services/fetchService";

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
            <div>
                <label htmlFor="username">Username</label>
                <input type="email"
                       id="username"
                       value={username || ""}
                       onChange={
                           (e) => setUsername(e.target.value)
                       }
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password"
                       id="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <button is="submit" type="button" onClick={() => sendLoginRequest()}>
                    Login
                </button>
            </div>
        </>
    );
};

export default Login;
