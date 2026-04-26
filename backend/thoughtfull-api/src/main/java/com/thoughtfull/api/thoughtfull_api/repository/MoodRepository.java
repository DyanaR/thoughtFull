package com.thoughtfull.api.thoughtfull_api.repository;

import com.thoughtfull.api.thoughtfull_api.model.Mood;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface MoodRepository extends JpaRepository<Mood, UUID> {
    Optional<Mood> findByName(String name);
}