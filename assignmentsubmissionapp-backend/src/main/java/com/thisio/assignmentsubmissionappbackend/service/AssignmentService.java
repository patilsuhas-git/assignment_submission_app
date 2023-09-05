package com.thisio.assignmentsubmissionappbackend.service;

import com.thisio.assignmentsubmissionappbackend.domain.Assignment;
import com.thisio.assignmentsubmissionappbackend.domain.User;
import com.thisio.assignmentsubmissionappbackend.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;
    public Assignment create(User user) {
        Assignment assignment = new Assignment();
        assignment.setStatus("Needs to be submitted");
        assignment.setUser(user);

        return assignmentRepository.save(assignment);
    }
}
