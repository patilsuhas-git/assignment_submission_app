package com.thisio.assignmentsubmissionappbackend.repository;

import com.thisio.assignmentsubmissionappbackend.domain.Assignment;
import com.thisio.assignmentsubmissionappbackend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    Set<Assignment> findByUser(User user);
}
