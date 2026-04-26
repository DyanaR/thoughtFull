package com.thoughtfull.api.thoughtfull_api.model;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.UUID;

@Entity // tells Spring to make this class a (db) table
@Table(name = "users")
public class User {
    // fields = columns
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id; // generated not set

    @Column(name = "auth0_id", unique = true, nullable = false)
    private String auth0Id;

    @Column(nullable = false)
    private String name;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    public User() {}

    public User(String auth0Id, String name){
        this.auth0Id = auth0Id;
        this.name = name;
    }

    // will run this method right before the object is saved to the db for the first time
    // handled by JPA lifecycle
    // automatically sets createdAt right before the entity is saved to the db for the first time
    @PrePersist
    public void prePersist(){
        this.createdAt = Instant.now();
    }

    // getters
    public UUID getId(){
        return id;
    }

    public String getName(){
        return name;
    }

    public String getAuth0Id(){
        return auth0Id;
    }

    public Instant getCreatedAt(){
        return createdAt;
    }

    // setters
    public void setName(String name){
        this.name = name;
    }

    public void setAuth0Id(String auth0Id){
        this.auth0Id = auth0Id;
    }

    public void setCreatedAt(Instant createdAt){
        this.createdAt = createdAt;
    }

}
