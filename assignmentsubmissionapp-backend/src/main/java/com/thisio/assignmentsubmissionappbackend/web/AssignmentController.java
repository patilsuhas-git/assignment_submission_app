package com.thisio.assignmentsubmissionappbackend.web;

import com.thisio.assignmentsubmissionappbackend.domain.Assignment;
import com.thisio.assignmentsubmissionappbackend.domain.User;
import com.thisio.assignmentsubmissionappbackend.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {
    @Autowired
    private AssignmentService assignmentService;
    @PostMapping("")
    public ResponseEntity<?> createAssignment(@AuthenticationPrincipal User user) {
        Assignment newAssignment = assignmentService.create(user);

        return ResponseEntity.ok(newAssignment);
    }
}
