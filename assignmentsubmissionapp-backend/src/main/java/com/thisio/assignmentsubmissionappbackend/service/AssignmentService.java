package com.thisio.assignmentsubmissionappbackend.service;

import com.thisio.assignmentsubmissionappbackend.domain.Assignment;
import com.thisio.assignmentsubmissionappbackend.domain.User;
import com.thisio.assignmentsubmissionappbackend.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.spel.ast.Assign;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

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

    public Set<Assignment> findByUser(User user) {
        return assignmentRepository.findByUser(user);
    }

    public Optional<Assignment> findById(Long assignmentId) {
        return assignmentRepository.findById(assignmentId);
    }
}
