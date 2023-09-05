import React, {useEffect, useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";
import {Link} from "react-router-dom";

const Dashboard = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [assignments, setAssignments] = useState(null);

    useEffect(() => {
        return () => {
            console.log(jwt);
            fetch("/api/assignments", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${jwt}`
                },
                method: "GET"
            }).then((response => {
                if(response.status === 200) {
                    return response.json();
                }
            })).then((assignmentData) => {
                setAssignments(assignmentData);
            })
        };
    }, []);


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
            //console.log('Created');
        });
    }

    return (
        <div style={{marginTop: "2em"}}>
            {/*<h1>Dashboard </h1>*/}
            {/*<h1>{jwt}</h1>*/}
            {assignments ? assignments.map(assignment =>
                <div>
                    <Link to={`/assignments/${assignment.id}`}>Assignment ID : {assignment.id} </Link>
                </div>) : <></>};
            <button onClick={() => createAssignment()}>Submit new Assignment</button>
        </div>
    );
};

export default Dashboard;
