import React, {useEffect, useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";
import {Link, Navigate} from "react-router-dom";
import ajax from "../Services/fetchService";
import {Button, Card} from "react-bootstrap";

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
        <div style={{ margin: "2em" }}>
            <div className="mb-5">
                <Button size="lg" onClick={() => createAssignment()}>
                    Submit New Assignment
                </Button>
            </div>
            {assignments ? (
                <div
                    className="d-grid gap-5"
                    style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}>
                    {assignments.map((assignment) => (
                        // <Col>
                        <Card
                            key={assignment.id}
                            style={{ width: "18rem", height: "18rem" }}
                        >
                            <Card.Body className="d-flex flex-column justify-content-around">
                                <Card.Title>Assignment #{assignment.id}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {assignment.status}
                                </Card.Subtitle>
                                <Card.Text style={{ marginTop: "1em" }}>
                                    <p>
                                        <b>GitHub URL</b>: {assignment.githubUrl}
                                    </p>
                                    <p>
                                        <b>Branch</b>: {assignment.branch}
                                    </p>
                                </Card.Text>

                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        window.location.href = `/assignments/${assignment.id}`;
                                    }}
                                >
                                    Edit
                                </Button>
                            </Card.Body>
                        </Card>
                        // </Col>
                    ))}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Dashboard;
