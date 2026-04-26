package com.thoughtfull.api.thoughtfull_api.repository;

import com.thoughtfull.api.thoughtfull_api.model.Entry;
import com.thoughtfull.api.thoughtfull_api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface EntryRepository extends JpaRepository<Entry, UUID> {
    // finds all entries that belong to a specific user, sorted by newest first.
    List<Entry> findByUserOrderByCreatedAtDesc(User user);
}