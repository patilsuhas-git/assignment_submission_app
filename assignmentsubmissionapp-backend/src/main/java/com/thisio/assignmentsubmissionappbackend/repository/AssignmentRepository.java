package com.thisio.assignmentsubmissionappbackend.repository;

import com.thisio.assignmentsubmissionappbackend.domain.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

}
