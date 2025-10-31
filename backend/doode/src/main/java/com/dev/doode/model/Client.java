package com.dev.doode.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * can create orders, search for kitchens by city, search for meals (TODO implement word search elastic search)
 */
@Entity
@Data
public class Client extends Person{
    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Order> orders = new ArrayList<>();
}
