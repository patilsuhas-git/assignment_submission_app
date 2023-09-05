import React, {useEffect, useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";

const AssignmentView = () => {
    const assignmentId = window.location.href.split("/assignments/")[1];
    const [assignment, setAssignment] = useState({
        branch: "",
        githubUrl: ""
    });
    const [jwt, setJwt] = useLocalState("", "jwt");

    function updateAssignment(prop, value) {
        const newAssignment = {...assignment};
        newAssignment[prop] = value;
        setAssignment(newAssignment);
    }

    useEffect(() => {
        return () => {
            //console.log("This is useEffect for loading page");
            fetch(`/api/assignments/${assignmentId}`, {
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
                setAssignment(assignmentData);
            })
        };
    }, []);

    function save(){
        fetch(`/api/assignments/${assignmentId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${jwt}`
            },
            method: "PUT",
            body: JSON.stringify(assignment)
        }).then((response => {
            if(response.status === 200) {
                return response.json();
            }
            console.log(response);
        })).then((assignmentData) => {
            setAssignment(assignmentData);
        })
    }

    return (
        <div>
            <h1>Assignment {assignmentId}</h1>
            {assignment ?(
                <>
                    <h2>Status : {assignment.status}</h2>
                    <h3>Github URL : <input type="url"
                                            id="gitHubUrl"
                                            onChange={(event) => updateAssignment("githubUrl", event.target.value)}
                                            value={assignment.githubUrl}
                    />
                    </h3>
                    <h3>Branch : <input type="text"
                                        id="branch"
                                        onChange={(e) => updateAssignment("branch", e.target.value)}
                                        value={assignment.branch}
                    />
                    </h3>
                    <button onClick={() => save()}>Submit Assignment</button>
                </>
            ) : (<>
                    <h1>This assignment do not exist.</h1>
                </>
            )}
        </div>
    );
};

export default AssignmentView;
