package com.dev.doode.model;

import com.dev.doode.helpers.OrderStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name = "orders")
public class Order {
    @Id
    private Long id;
    @ManyToOne
    @JoinColumn(name = "business_id", nullable = false)
    private FoodVendor vendor;
    @ManyToOne
    @JoinColumn(name = "client_id", insertable = false, updatable = false)
    private Client client;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private List<Delicacy> content;
    private OrderStatus status;
    private LocalDateTime dateTime;
}
