package com.dev.doode.service;

import com.dev.doode.helpers.OrderStatus;
import com.dev.doode.model.Client;
import com.dev.doode.model.FoodVendor;
import com.dev.doode.model.Order;
import com.dev.doode.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }


    public Order saveOrder(Order order){
        return orderRepository.save(order);
    }

    /**
     *
     * @param vendor
     * @return all not complete orders for this business
     */
    public List<Order> getActiveVendorOrders(FoodVendor vendor){
        return orderRepository.findByVendorAndStatusNot(vendor,OrderStatus.COMPLETE);

    }
    /**
     *
     * @param client
     * @return all not complete orders for this client
     */
    public List<Order> getActiveClientOrders(Client client){
        return orderRepository.findByClientAndStatusNot(client,OrderStatus.COMPLETE);
    }
}
