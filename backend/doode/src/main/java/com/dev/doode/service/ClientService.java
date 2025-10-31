package com.dev.doode.service;

import com.dev.doode.helpers.OrderStatus;
import com.dev.doode.model.*;
import com.dev.doode.repository.ClientRepository;
import com.dev.doode.repository.FoodVendorRepository;
import com.dev.doode.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ClientService {

    private  final ClientRepository clientRepo;
    private final OrderService orderService;
    private final FoodVendorService foodVendorService;

    public ClientService(ClientRepository clientRepo, OrderService orderService, FoodVendorService foodVendorService) {
        this.clientRepo = clientRepo;
        this.orderService = orderService;
        this.foodVendorService = foodVendorService;
    }


    public void rateBusiness(Long businessId, Integer rate){
        foodVendorService.updateRating(businessId,rate);
    }


    public Client saveClient(Client person) {
        return clientRepo.save(person);
    }

    public Order createOrder(Long businessId, Long clientId, List<Delicacy> content){
        Order order  = new Order();
        order.setClientId(clientId);
        order.setBusinessId(businessId);
        order.setContent(content);
        order.setStatus(OrderStatus.PLACED);
        return orderService.saveOrder(order);
    }

    public String leaveReview(Long businessId,Long id, String review){
        return foodVendorService.addReview(review,businessId,id);
    }
}
