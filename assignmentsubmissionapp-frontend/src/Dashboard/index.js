import React from 'react';
import {useLocalState} from "../util/useLocalStorage";

const Dashboard = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");

    function createAssignment() {
        fetch("/api/assignments", {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${jwt}`
            },
            method: "POST"
        }).then((response) => {
            if (response.status === 200) return response.json();
        }).then((assignment) => {
            window.location.href = `/assignment/${assignment.id}`;
        });
    }

    return (
        <div style={{marginTop: "2em"}}>
            {/*<h1>Dashboard </h1>*/}
            {/*<h1>{jwt}</h1>*/}
            <button onClick={() => createAssignment()}>Submit new Assignment</button>
        </div>
    );
};

export default Dashboard;
