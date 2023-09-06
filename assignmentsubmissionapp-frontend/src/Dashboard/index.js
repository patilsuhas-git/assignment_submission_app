import React, {useEffect, useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";
import {Link} from "react-router-dom";
import ajax from "../Services/fetchService";

const Dashboard = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [assignments, setAssignments] = useState(null);

    useEffect(() => {
        return () => {
            ajax("/api/assignments", "GET", jwt, null)
                .then((response => {
                    if(response.status === 200) {
                        return response.json();
                    }
                }))
                .then((assignmentData) => {
                setAssignments(assignmentData);
            })
        };
    }, []);


    function createAssignment() {
        ajax("/api/assignments", "POST", jwt, null)
            .then((response => {
                if(response.status === 200) {
                    return response.json();
                }
            }))
            .then((assignment) => {
            window.location.href = `/assignment/${assignment.id}`;
            //console.log('Created');
        });
    }

    return (
        <div style={{marginTop: "2em"}}>
            {assignments ? assignments.map(assignment =>
                <div key={assignment.id}>
                    <Link  to={`/assignments/${assignment.id}`}>Assignment ID : {assignment.id} </Link>
                </div>) : <></>};
            <button onClick={() => createAssignment()}>Submit new Assignment</button>
        </div>
    );
};

export default Dashboard;
