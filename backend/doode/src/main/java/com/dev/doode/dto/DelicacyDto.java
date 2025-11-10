package com.dev.doode.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record DelicacyDto(
        @NotBlank(message = "Name is required")
        String name,
        @NotNull(message = "Price is required")
        @Positive(message = "Price must be positive")
        Integer price,
        String description,
        String imagePath
) {}