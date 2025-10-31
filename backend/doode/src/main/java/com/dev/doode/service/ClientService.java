package com.dev.doode.service;

import com.dev.doode.helpers.OrderStatus;
import com.dev.doode.model.*;
import com.dev.doode.repository.ClientRepository;
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
        order.setClient(findClientById(clientId));
        order.setVendor(foodVendorService.getVendorById(businessId));
        order.setContent(content);
        order.setStatus(OrderStatus.PLACED);
        return orderService.saveOrder(order);
    }

    public String leaveReview(Long businessId,Long id, String review){
        return foodVendorService.addReview(review,businessId,id);
    }

    public List<Order> getActiveOrders(Long id) {
        Client client = clientRepo.findById(id).orElseThrow(()->new RuntimeException("no client with this id"));
        return orderService.getActiveClientOrders(client);
    }

    public Client findClientById(Long clientId) {
        return clientRepo.findById(clientId).orElseThrow(()->new RuntimeException("no client with such id"));
    }
}
