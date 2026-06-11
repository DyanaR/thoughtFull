package com.thoughtfull.api.thoughtfull_api.dto;

import java.util.UUID;

// used for GET /users/me
public class UserResponse {

    private UUID id;
    private String name;

    public UserResponse(UUID id, String name) {
        this.id = id;
        this.name = name;
    }


    public UUID getId() { return id; }
    public String getName() { return name; }
}

