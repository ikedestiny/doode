package com.dev.doode.service;

import com.dev.doode.model.FoodVendor;
import com.dev.doode.model.Order;
import com.dev.doode.repository.FoodVendorRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodVendorService {
    private final FoodVendorRepository foodVendorRepository;
    private final OrderService orderService;

    public FoodVendorService(FoodVendorRepository foodVendorRepository, OrderService orderService) {
        this.foodVendorRepository = foodVendorRepository;
        this.orderService = orderService;
    }

    public FoodVendor saveVendor(FoodVendor vendor) {
        return foodVendorRepository.save(vendor);
    }

    public List<FoodVendor> getAllVendors() {
        return  foodVendorRepository.findAll();
    }

    public FoodVendor getVendorById(Long id) {
        return foodVendorRepository.findById(id).orElseThrow(()->new RuntimeException("no vendir with such id"));
    }

    public FoodVendor updateVendor(Long id, FoodVendor vendorDetails) {
        FoodVendor existingVendor = foodVendorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));

        existingVendor.setName(vendorDetails.getName());
        existingVendor.setCity(vendorDetails.getCity());
        existingVendor.setBusinessOwner(vendorDetails.getBusinessOwner());
        existingVendor.setAddress(vendorDetails.getAddress());
        existingVendor.setDelivery(vendorDetails.getDelivery());
        existingVendor.setMenuImagePath(vendorDetails.getMenuImagePath());
        existingVendor.setDelicacies(vendorDetails.getDelicacies());

        return foodVendorRepository.save(existingVendor);
    }

    public void deleteVendor(Long id) {
        foodVendorRepository.delete(foodVendorRepository.findById(id).orElseThrow(()->new RuntimeException("No user with such ID")));
    }

    @Transactional
    public void updateRating(Long id, Integer rate) {
        int updated = foodVendorRepository.updateRatingAtomic(id, rate);
        if (updated == 0) {
            throw new RuntimeException("Vendor not found");
        }
    }

    public String addReview(String review, Long businessId, Long clientId){
        FoodVendor vendor = foodVendorRepository.findById(businessId).orElseThrow(()->new RuntimeException("no business with this id"));
        vendor.getReviews().put(clientId,review);
        foodVendorRepository.save(vendor);
        return review + "ADDED";
    }

    public List<Order> getActiveOrders(Long businessId){
        FoodVendor vendor = foodVendorRepository.findById(businessId).orElseThrow(()->new RuntimeException("no vendor with such id"));
        return orderService.getActiveVendorOrders(vendor);
    }
}
