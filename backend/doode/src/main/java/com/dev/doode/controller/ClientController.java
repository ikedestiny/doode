package com.dev.doode.controller;

import com.dev.doode.dto.OrderDto;
import com.dev.doode.helpers.OrderStatus;
import com.dev.doode.model.Order;
import com.dev.doode.service.ClientService;
import com.dev.doode.service.FoodVendorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/doode/client")
public class ClientController {
    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }


    @PostMapping("/review")
    public ResponseEntity<String> reviewBiz(@RequestBody String review, Long businessId, Long clientId){
        return ResponseEntity.ok(clientService.leaveReview(businessId,clientId,review));
    }

    @PostMapping("/create-order")
    public ResponseEntity<Order> createOrder(@RequestBody OrderDto dto){
       return ResponseEntity.ok(clientService.createOrder(dto.businessId(), dto.clientId(), dto.content()));
    }

    @GetMapping("/{id}/active-orders")
    public ResponseEntity<List<Order>> getActiveOrders(@PathVariable Long id){
        return ResponseEntity.ok(clientService.getActiveOrders(id));
    }




}
