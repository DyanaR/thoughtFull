package com.thoughtfull.api.thoughtfull_api.model;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "moods")
public class Mood {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true, nullable = false)
    private String name;

    private String color;

    public Mood(){}

    public Mood(String name, String color){
        this.name = name;
        this.color = color;
    }

    // getters
    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getColor() {
        return color;
    }

    // setters
    public void setName(String name) {
        this.name = name;
    }

    public void setColor(String color) {
        this.color = color;
    }

}
