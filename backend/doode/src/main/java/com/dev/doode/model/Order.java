package com.dev.doode.model;

import com.dev.doode.helpers.OrderStatus;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class Order {
    @Id
    private Long id;
    private Long businessId;
    private Long clientId;
    private List<Delicacy> content;
    private OrderStatus status;
    private LocalDateTime dateTime;
}
