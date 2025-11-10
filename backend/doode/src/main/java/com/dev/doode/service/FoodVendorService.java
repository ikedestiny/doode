package com.dev.doode.service;

import com.dev.doode.helpers.City;
import com.dev.doode.model.*;
import com.dev.doode.repository.FoodVendorRepository;
import com.dev.doode.repository.DelicacyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class FoodVendorService {

    private final FoodVendorRepository foodVendorRepository;
    private final DelicacyRepository delicacyRepository;
    private final PersonService personService;

    public FoodVendorService(FoodVendorRepository foodVendorRepository,
                             DelicacyRepository delicacyRepository,
                             PersonService personService) {
        this.foodVendorRepository = foodVendorRepository;
        this.delicacyRepository = delicacyRepository;
        this.personService = personService;
    }

    public List<FoodVendor> getAllVendors() {
        return foodVendorRepository.findAll();
    }

    public FoodVendor getVendorById(Long id) {
        return foodVendorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vendor not found with id: " + id));
    }

    public FoodVendor saveVendor(FoodVendor vendor) {
        return foodVendorRepository.save(vendor);
    }

    public FoodVendor updateVendor(Long id, FoodVendor vendorDetails) {
        FoodVendor vendor = getVendorById(id);

        vendor.setName(vendorDetails.getName());
        vendor.setCity(vendorDetails.getCity());
        vendor.setAddress(vendorDetails.getAddress());
        vendor.setDelivery(vendorDetails.getDelivery());
        vendor.setMenuImagePath(vendorDetails.getMenuImagePath());

        return foodVendorRepository.save(vendor);
    }

    public void deleteVendor(Long id) {
        FoodVendor vendor = getVendorById(id);
        foodVendorRepository.delete(vendor);
    }

    public List<Order> getActiveOrders(Long vendorId) {
        FoodVendor vendor = getVendorById(vendorId);
        // Assuming you have a method to filter active orders
        return vendor.getOrders().stream()
                .filter(order -> "PENDING".equals(order.getStatus()) || "PROCESSING".equals(order.getStatus()))
                .toList();
    }

    // Add delicacy to vendor
    public Delicacy addDelicacyToVendor(Long vendorId, Delicacy delicacy) {
        FoodVendor vendor = getVendorById(vendorId);

        // Set the vendor reference on the delicacy
        delicacy.setFoodVendor(vendor);

        // Add to vendor's delicacies list
        vendor.getDelicacies().add(delicacy);

        // Save both (cascade should handle this)
        foodVendorRepository.save(vendor);

        return delicacy;
    }

    // Update existing delicacy
    public Delicacy updateDelicacy(Long vendorId, Long delicacyId, Delicacy delicacyDetails) {
        FoodVendor vendor = getVendorById(vendorId);

        Delicacy delicacy = vendor.getDelicacies().stream()
                .filter(d -> d.getId().equals(delicacyId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Delicacy not found with id: " + delicacyId));

        delicacy.setName(delicacyDetails.getName());
        delicacy.setPrice(delicacyDetails.getPrice());
        delicacy.setDescription(delicacyDetails.getDescription());
        delicacy.setImagePath(delicacyDetails.getImagePath());

        return delicacyRepository.save(delicacy);
    }

    // Remove delicacy from vendor
    public void removeDelicacyFromVendor(Long vendorId, Long delicacyId) {
        FoodVendor vendor = getVendorById(vendorId);

        boolean removed = vendor.getDelicacies().removeIf(d -> d.getId().equals(delicacyId));

        if (removed) {
            foodVendorRepository.save(vendor);
            delicacyRepository.deleteById(delicacyId);
        } else {
            throw new RuntimeException("Delicacy not found with id: " + delicacyId);
        }
    }

    // Get vendors by city
    public List<FoodVendor> getVendorsByCity(City city) {
        return foodVendorRepository.findByCity(city);
    }

    // Get vendors with delivery
    public List<FoodVendor> getVendorsWithDelivery() {
        return foodVendorRepository.findByDeliveryTrue();
    }


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
}
