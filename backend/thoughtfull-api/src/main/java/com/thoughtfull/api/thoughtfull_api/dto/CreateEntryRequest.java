package com.thoughtfull.api.thoughtfull_api.dto;

import java.util.Set;
import java.util.UUID;

// used for POST /entries
public class CreateEntryRequest {

    private String title;
    private String content;
    private Set<UUID> moodIds;

    public String getTitle() { return title; }
    public String getContent() { return content; }
    public Set<UUID> getMoodIds() { return moodIds; }

    public void setTitle(String title) { this.title = title; }
    public void setContent(String content) { this.content = content; }
    public void setMoodIds(Set<UUID> moodIds) { this.moodIds = moodIds; }
}