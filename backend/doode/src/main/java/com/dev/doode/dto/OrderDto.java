package com.dev.doode.dto;

import com.dev.doode.model.Delicacy;

import java.util.List;

public record OrderDto(Long businessId, Long clientId, List<Delicacy> content) {
}
