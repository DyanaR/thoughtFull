package com.thoughtfull.api.thoughtfull_api.repository;

import com.thoughtfull.api.thoughtfull_api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByAuth0Id(String auth0Id);
}