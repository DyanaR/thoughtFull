package com.thoughtfull.api.thoughtfull_api.model;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "entries")
public class Entry {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "content", columnDefinition = "TEXT", nullable = false)
    private String content;

    @ManyToMany
    @JoinTable(
            name = "entry_moods",
            joinColumns = @JoinColumn(name = "entry_id"),
            inverseJoinColumns = @JoinColumn(name = "mood_id")
    )
    private Set<Mood> moods = new HashSet<>();

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    public Entry() {}

    public Entry(User user, String title, String content){
        this.user = user;
        this.title = title;
        this.content = content;
    }

    @PrePersist
    public void prePersist(){
        Instant now = Instant.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = Instant.now();
    }

    // getters
    public UUID getId(){
        return id;
    }

    public User getUser(){
        return user;
    }

    public String getTitle(){
        return title;
    }

    public String getContent(){
        return content;
    }

    public Set<Mood> getMoods() {
        return moods;
    }

    public Instant getCreatedAt(){
        return createdAt;
    }

    public Instant getUpdatedAt(){
        return updatedAt;
    }

    // setters
    public void setUser(User user) {
        this.user = user;
    }

    public void setTitle(String title){
        this.title = title;
    }

    public void setContent(String content){
        this.content = content;
    }

    public void setMoods(Set<Mood> moods) {
        this.moods = moods;
    }

    public void setCreatedAt(Instant createdAt){
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Instant updatedAt){
        this.updatedAt = updatedAt;
    }

}
