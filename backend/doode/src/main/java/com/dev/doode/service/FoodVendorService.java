package com.dev.doode.service;

import com.dev.doode.model.FoodVendor;
import com.dev.doode.repository.FoodVendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FoodVendorService {
    @Autowired
    private FoodVendorRepository foodVendorRepository;

    public FoodVendor saveVendor(FoodVendor vendor) {
        return foodVendorRepository.save(vendor);
    }

    public List<FoodVendor> getAllVendors() {
        return  foodVendorRepository.findAll();
    }

    public Optional<FoodVendor> getVendorById(Long id) {
        return foodVendorRepository.findById(id);
    }

    public FoodVendor updateVendor(Long id, FoodVendor vendorDetails) {
        FoodVendor existingVendor = foodVendorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));

        existingVendor.setName(vendorDetails.getName());
        existingVendor.setCity(vendorDetails.getCity());
        existingVendor.setBusinessOwner(vendorDetails.getBusinessOwner());
        existingVendor.setAddress(vendorDetails.getAddress());
        existingVendor.setDelivery(vendorDetails.getDelivery());
        existingVendor.setPhoneNumber(vendorDetails.getPhoneNumber());
        existingVendor.setMenuImagePath(vendorDetails.getMenuImagePath());
        existingVendor.setEmail(vendorDetails.getEmail());
        existingVendor.setDelicacies(vendorDetails.getDelicacies());

        return foodVendorRepository.save(existingVendor);
    }

    public void deleteVendor(Long id) {

        foodVendorRepository.delete(foodVendorRepository.findById(id).get());
    }
}
