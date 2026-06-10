package com.thoughtfull.api.thoughtfull_api.dto;

import java.util.UUID;

public record MoodResponse(
        UUID id,
        String name,
        String color
) {}

