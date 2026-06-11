package com.thoughtfull.api.thoughtfull_api.service;

import com.thoughtfull.api.thoughtfull_api.dto.UpdateUserRequest;
import com.thoughtfull.api.thoughtfull_api.dto.UserResponse;
import com.thoughtfull.api.thoughtfull_api.model.User;
import com.thoughtfull.api.thoughtfull_api.repository.UserRepository;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    // connects to the database through JPA
    // can talk to db w/out writing SQL
    private final UserRepository userRepository;

    // Constructor (dependency) injection (Spring automatically provides UserRepository)
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // this method used when frontend calls:
    // GET /api/v1/users/me
    public UserResponse getCurrentUser(Jwt jwt) {
        // step 1: find or create the user based on Auth0 token
        User user = getOrCreateUser(jwt);

        // step 2: convert database object -> API response (DTO)
        return new UserResponse(
                user.getId(),
                user.getName()
        );
    }

    // core logic
    // ensures: "if user exists -> return it" and "if not -> create and save it"
    public User getOrCreateUser(Jwt jwt) {

        // step 1: get unique Auth0 ID from token
        // EX: "auth0|abc123"
        String auth0Id = jwt.getSubject();

        // step 4: check database for existing  user
        return userRepository.findByAuth0Id(auth0Id)

                // if NOT -> create new user and save to DB
                .orElseGet(() -> userRepository.save(
                new User(auth0Id, "")
        ));
    }

    public UserResponse updateCurrentUser(
            Jwt jwt,
            UpdateUserRequest request
    ) {
        User user = getOrCreateUser(jwt);

        user.setName(request.getName().trim());

        User updatedUser = userRepository.save(user);

        return new UserResponse(
                updatedUser.getId(),
                updatedUser.getName()
        );
    }
}