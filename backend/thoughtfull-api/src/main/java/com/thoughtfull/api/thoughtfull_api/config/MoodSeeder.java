package com.thoughtfull.api.thoughtfull_api.config;

import com.thoughtfull.api.thoughtfull_api.model.Mood;
import com.thoughtfull.api.thoughtfull_api.repository.MoodRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MoodSeeder {

    @Bean
    CommandLineRunner seedMoods(MoodRepository moodRepository) {
        return args ->  {
            createMoodIfMissing(moodRepository, "happy", "#FFD700");
            createMoodIfMissing(moodRepository, "calm", "#87CEFA");
            createMoodIfMissing(moodRepository, "sad", "#1E90FF");
            createMoodIfMissing(moodRepository, "anxious", "#FF8C00");
            createMoodIfMissing(moodRepository, "angry", "#FF0000");
            createMoodIfMissing(moodRepository, "grateful", "#32CD32");
            createMoodIfMissing(moodRepository, "excited", "#FF69B4");
            createMoodIfMissing(moodRepository, "tired", "#A9A9A9");
        };
    }

    private void createMoodIfMissing(MoodRepository moodRepository, String name, String color) {
        moodRepository.findByName(name)
                .orElseGet(() -> moodRepository.save(new Mood(name, color)));
    }
}