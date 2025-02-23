package com.anscom.backend.controller;

import com.anscom.backend.dto.LoginUserDto;
import com.anscom.backend.dto.RegisterUserDto;
import com.anscom.backend.model.User;
import com.anscom.backend.repository.UserRepository;
import com.anscom.backend.responses.LoginResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.anscom.backend.service.UserService;

import java.util.List;

@RequestMapping("/users")
@RestController
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;

    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @GetMapping("/me")
    public ResponseEntity<User> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        return ResponseEntity.ok(currentUser);
    }

    @GetMapping("/")
    public ResponseEntity<List<User>> allUsers() {
        List <User> users = userService.allUsers();
        return ResponseEntity.ok(users);
    }


    @GetMapping("/testing")
    public ResponseEntity<String> testingFunction() {
        // Create a mock user for testing purposes
        String testing = "testingkk";
        System.out.println("hello");
        return ResponseEntity.ok(testing);
    }
}