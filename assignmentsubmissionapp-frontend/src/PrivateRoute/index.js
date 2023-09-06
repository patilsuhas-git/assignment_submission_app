import React, {useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";
import {Navigate} from "react-router-dom";
import ajax from "../Services/fetchService";

const PrivateRoute = ({children}) => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState(null);
    // console.log("JWT :::: "+jwt);
    if (jwt) {
        ajax(`/api/auth/validate?token=${jwt}`, "get", jwt).then((response) => {
                return response.json();
            }).then((responseData) => {
                setIsValid(responseData.isValid);
                setIsLoading(false);
            });
    } else {
        return <Navigate to="/login"/>;
    }

    if(isLoading) {
        return <div>Loading....</div>;
    } else {
        if(isValid === true) {
            return children;
        } else {
            return <Navigate to="/login"/>;
        }
    }
};

export default PrivateRoute;
