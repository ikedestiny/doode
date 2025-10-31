package com.dev.doode.service;

import com.dev.doode.model.Order;
import com.dev.doode.repository.OrderRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }


    public Order saveOrder(Order order){
        return orderRepository.save(order);
    }
}
