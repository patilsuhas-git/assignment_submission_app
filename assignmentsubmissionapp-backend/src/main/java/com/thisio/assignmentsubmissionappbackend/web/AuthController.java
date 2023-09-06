package com.thisio.assignmentsubmissionappbackend.web;

import com.thisio.assignmentsubmissionappbackend.domain.User;
import com.thisio.assignmentsubmissionappbackend.dto.AssignmentValidationResult;
import com.thisio.assignmentsubmissionappbackend.dto.AuthCredentialsRequest;
import com.thisio.assignmentsubmissionappbackend.filter.JwtFilter;
import com.thisio.assignmentsubmissionappbackend.util.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody AuthCredentialsRequest request) {
        try {
            Authentication authenticate = authenticationManager
                .authenticate(
                    new UsernamePasswordAuthenticationToken(
                        request.getUsername(), request.getPassword()
                    )
                );

            User user = (User) authenticate.getPrincipal();
            user.setPassword(null);
            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.AUTHORIZATION,
                            jwtUtil.generateToken(user)
                    )
                    .body(user);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("validate")
    public ResponseEntity<?> validateToken(@RequestParam String token, @AuthenticationPrincipal User user) {
        try{
            Boolean isValid = jwtUtil.validateToken(token, user);
            AssignmentValidationResult result = new AssignmentValidationResult();
            result.message = "Is is ok";
            result.isValid = true;
            return ResponseEntity.ok(result);
        } catch(ExpiredJwtException jwtExcp) {
            AssignmentValidationResult result = new AssignmentValidationResult();
            result.isValid = false;
            result.message = "Is is not not not not ok";
            return ResponseEntity.ok(false);
        }
    }
}
