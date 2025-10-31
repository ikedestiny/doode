package com.dev.doode.repository;

import com.dev.doode.helpers.OrderStatus;
import com.dev.doode.model.Client;
import com.dev.doode.model.FoodVendor;
import com.dev.doode.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // Get all orders for a business excluding a certain status
    List<Order> findByVendorAndStatusNot(FoodVendor vendor, OrderStatus status);

    // Get all orders for a client excluding a certain status
    List<Order> findByClientAndStatusNot(Client client, OrderStatus status);

    // Optionally, get only completed orders
    List<Order> findByVendorAndStatus(FoodVendor vendor, OrderStatus status);
    List<Order> findByClientAndStatus(Client client, OrderStatus status);
}
