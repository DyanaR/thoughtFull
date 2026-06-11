package com.thoughtfull.api.thoughtfull_api.controller;

import com.thoughtfull.api.thoughtfull_api.dto.UpdateUserRequest;
import com.thoughtfull.api.thoughtfull_api.dto.UserResponse;
import com.thoughtfull.api.thoughtfull_api.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/me")
    public UserResponse getCurrentUser(@AuthenticationPrincipal Jwt jwt){
        return userService.getCurrentUser(jwt);
    }

    @PatchMapping("/me")
    public UserResponse updateCurrentUser(
            @AuthenticationPrincipal Jwt jwt,
            @RequestBody UpdateUserRequest request
    ) {
        return userService.updateCurrentUser(jwt, request);
    }
}