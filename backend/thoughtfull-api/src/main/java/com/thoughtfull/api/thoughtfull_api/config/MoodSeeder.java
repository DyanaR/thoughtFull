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
            createMoodIfMissing(moodRepository, "happy", "#FDE7A8");
            createMoodIfMissing(moodRepository, "calm", "#CEC0EE");
            createMoodIfMissing(moodRepository, "sad", "#C9D8F0");
            createMoodIfMissing(moodRepository, "anxious", "#FDDAC2");
            createMoodIfMissing(moodRepository, "angry", "#F6C6C6");
            createMoodIfMissing(moodRepository, "grateful", "#CDEBCF");
            createMoodIfMissing(moodRepository, "excited", "#F8C9DE");
            createMoodIfMissing(moodRepository, "tired", "#E0E0E0");
        };
    }

    private void createMoodIfMissing(MoodRepository moodRepository, String name, String color) {
        moodRepository.findByName(name)
                .orElseGet(() -> moodRepository.save(new Mood(name, color)));
    }
}