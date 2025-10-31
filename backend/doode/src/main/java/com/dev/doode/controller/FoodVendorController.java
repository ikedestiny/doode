package com.dev.doode.controller;

import com.dev.doode.dto.VendorDto;
import com.dev.doode.helpers.City;
import com.dev.doode.model.FoodVendor;
import com.dev.doode.model.Order;
import com.dev.doode.service.FoodVendorService;
import com.dev.doode.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/doode/vendors")
public class FoodVendorController {

    @Autowired
    private FoodVendorService foodVendorService;
    @Autowired
    private PersonService personService;

    @GetMapping
    public ResponseEntity<List<FoodVendor>> getAllVendors() {
        return ResponseEntity.ok(foodVendorService.getAllVendors());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodVendor> getVendorById(@PathVariable Long id) {
        return ResponseEntity.ok(foodVendorService.getVendorById(id));
    }

    @PostMapping
    public ResponseEntity<FoodVendor> createVendor(@RequestBody VendorDto vendorDto) {
        FoodVendor vendor = new FoodVendor();
        vendor.setName(vendorDto.name());
        vendor.setCity(City.fromString(vendorDto.city()));
        personService.setTypeAsBusiness(vendorDto.ownerId());
        vendor.setBusinessOwner(personService.findPersonById(vendorDto.ownerId()));
        vendor.setAddress("----");
        return new ResponseEntity<>(foodVendorService.saveVendor(vendor), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FoodVendor> updateVendor(@PathVariable Long id, @RequestBody FoodVendor vendor) {
        return ResponseEntity.ok(foodVendorService.updateVendor(id, vendor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVendor(@PathVariable Long id) {
        foodVendorService.deleteVendor(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/{id}/active-orders")
    public ResponseEntity<List<Order>> getActiveOrders(@PathVariable Long id){
        return ResponseEntity.ok(foodVendorService.getActiveOrders(id));
    }
}