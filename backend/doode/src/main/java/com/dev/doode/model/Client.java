package com.dev.doode.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * can create orders, search for kitchens by city, search for meals (TODO implement word search elastic search)
 */
@Entity
@Data
public class Client extends Person{
    @Id
    private Long id;
    private List<Order> orders = new ArrayList<>();
}
