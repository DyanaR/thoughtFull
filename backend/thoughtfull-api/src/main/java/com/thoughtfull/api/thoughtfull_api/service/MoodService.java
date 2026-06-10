package com.thoughtfull.api.thoughtfull_api.service;

import com.thoughtfull.api.thoughtfull_api.dto.MoodResponse;
import com.thoughtfull.api.thoughtfull_api.repository.MoodRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MoodService {

    private final MoodRepository moodRepository;

    public MoodService(MoodRepository moodRepository) {
        this.moodRepository = moodRepository;
    }

    public List<MoodResponse> getAllMoods() {
        return moodRepository.findAll()
                .stream()
                .map(mood -> new MoodResponse(
                        mood.getId(),
                        mood.getName(),
                        mood.getColor()
                ))
                .toList();
    }
}