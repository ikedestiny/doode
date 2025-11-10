package com.dev.doode.service;

import com.dev.doode.dto.VendorDto;
import com.dev.doode.helpers.City;
import com.dev.doode.helpers.PType;
import com.dev.doode.model.FoodVendor;
import com.dev.doode.model.Person;
import com.dev.doode.repository.FoodVendorRepository;
import com.dev.doode.repository.PersonRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
@Slf4j
public class VendorCreationService {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private FoodVendorRepository foodVendorRepository;

    public FoodVendor createVendorWithBusinessType(VendorDto vendorDto) {
        // 1. Update person type
        int updatedRows = personRepository.updatePType(vendorDto.ownerId(), PType.VENDOR);
        if (updatedRows == 0) {
            throw new RuntimeException("Person not found or update failed for id: " + vendorDto.ownerId());
        }

        // 2. Get the updated person
        Person businessOwner = personRepository.findById(vendorDto.ownerId())
                .orElseThrow(() -> new RuntimeException("Person not found after update"));

        // 3. Create and save vendor
        FoodVendor vendor = new FoodVendor();
        vendor.setName(vendorDto.name());
        vendor.setCity(City.fromString(vendorDto.city()));
        vendor.setBusinessOwner(businessOwner);
        vendor.setAddress(vendorDto.address() != null ? vendorDto.address() : "Not specified");
        vendor.setDelivery(vendorDto.delivery() != null ? vendorDto.delivery() : false);
        vendor.setTotalRatings(0);
        vendor.setAverageRating(0.0);

        return foodVendorRepository.save(vendor);
    }
}