package com.thoughtfull.api.thoughtfull_api.controller;

import com.thoughtfull.api.thoughtfull_api.dto.MoodResponse;
import com.thoughtfull.api.thoughtfull_api.service.MoodService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/moods")
public class MoodController {

    private final MoodService moodService;

    public MoodController(MoodService moodService) {
        this.moodService = moodService;
    }

    @GetMapping
    public ResponseEntity<List<MoodResponse>> getAllMoods() {
        return ResponseEntity.ok(
                moodService.getAllMoods()
        );
    }
}