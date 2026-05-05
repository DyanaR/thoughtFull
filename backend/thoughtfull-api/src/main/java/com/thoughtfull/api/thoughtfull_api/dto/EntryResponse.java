package com.thoughtfull.api.thoughtfull_api.dto;

import java.time.Instant;
import java.util.Set;
import java.util.UUID;

// Used when returning entries to frontend
public class EntryResponse {

    private UUID id;
    private String title;
    private String content;
    private Set<String> moods;
    private Instant createdAt;
    private Instant updatedAt;

    public EntryResponse(UUID id, String title, String content, Set<String> moods, Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.moods = moods;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public UUID getId() { return id; }
    public String getTitle() { return title; }
    public String getContent() { return content; }
    public Set<String> getMoods() { return moods; }
    public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt;}
}