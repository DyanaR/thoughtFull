package com.thoughtfull.api.thoughtfull_api.dto;

import jakarta.validation.constraints.Size;

import java.util.Set;
import java.util.UUID;

// used for PATCH /entries/{id}
public class UpdateEntryRequest {

    private String title;
    private String content;

    @Size(max = 3, message = "Maximum 3 moods allowed")
    private Set<UUID> moodIds;

    public String getTitle() { return title; }
    public String getContent() { return content; }
    public Set<UUID> getMoodIds() { return moodIds; }

    public void setTitle(String title) { this.title = title; }
    public void setContent(String content) { this.content = content; }
    public void setMoodIds(Set<UUID> moodIds) { this.moodIds = moodIds; }

}