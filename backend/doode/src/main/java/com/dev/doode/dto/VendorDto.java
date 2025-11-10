package com.dev.doode.dto;

public record VendorDto(
        String name,
        String city,
        Long ownerId,
        String address,
        Boolean delivery 
) {}