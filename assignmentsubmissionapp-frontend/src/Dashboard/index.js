import React from 'react';
import {useLocalState} from "../util/useLocalStorage";

const Dashboard = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    return (
        <div>
            <h1>Dashboard </h1>
            <h1>{jwt}</h1>
        </div>
    );
};

export default Dashboard;
