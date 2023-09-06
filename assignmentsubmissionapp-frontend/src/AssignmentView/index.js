import React, {useEffect, useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";
import ajax from "../Services/fetchService";
import {Button} from "react-bootstrap";

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
            ajax(`/api/assignments/${assignmentId}`, "GET", jwt, null)
                .then((response => {
                    if(response.status === 200) {
                        return response.json();
                    }
                }))
                .then((assignmentData) => {
                setAssignment(assignmentData);
            })
        };
    }, []);

    function save(){
        ajax(`/api/assignments/${assignmentId}`, "PUT", jwt, assignment)
            .then((response => {
                if(response.status === 200) {
                    return response.json();
                }
            })).then((assignmentData) => {
                setAssignment(assignmentData);
            });
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
                    <Button size="lg" onClick={() => save()}>Submit Assignment</Button>
                </>
            ) : (<>
                    <h1>This assignment do not exist.</h1>
                </>
            )}
        </div>
    );
};

export default AssignmentView;
