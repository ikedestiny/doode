package com.dev.doode.controller;

import com.dev.doode.dto.VendorDto;
import com.dev.doode.dto.DelicacyDto;
import com.dev.doode.helpers.City;
import com.dev.doode.model.Delicacy;
import com.dev.doode.model.FoodVendor;
import com.dev.doode.model.Order;
import com.dev.doode.service.FoodVendorService;
import com.dev.doode.service.PersonService;
import com.dev.doode.service.VendorCreationService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/doode/vendors")
public class FoodVendorController {
    Logger logger = LoggerFactory.getLogger(FoodVendorController.class);

    @Autowired
    private FoodVendorService foodVendorService;

    @Autowired
    private PersonService personService;

    @Autowired
    private VendorCreationService vendorCreationService;

    @GetMapping
    public ResponseEntity<List<FoodVendor>> getAllVendors() {
        return ResponseEntity.ok(foodVendorService.getAllVendors());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodVendor> getVendorById(@PathVariable Long id) {
        return ResponseEntity.ok(foodVendorService.getVendorById(id));
    }

    @PostMapping
    public ResponseEntity<?> createVendor(@RequestBody VendorDto vendorDto) {
        logger.info("create vendor called for ownerId: {}", vendorDto.ownerId());

        try {
            FoodVendor savedVendor = vendorCreationService.createVendorWithBusinessType(vendorDto);
            return new ResponseEntity<>(savedVendor, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            logger.error("Error creating vendor: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
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

    @GetMapping("/{id}/dishes")
    public ResponseEntity<List<Delicacy>> getVendorDelicacies(@PathVariable Long id){
        return ResponseEntity.ok(foodVendorService.getVendorById(id).getDelicacies());
    }

    @PostMapping("/{vendorId}/dishes")
    public ResponseEntity<?> addDelicacy(@PathVariable Long vendorId, @RequestBody @Valid DelicacyDto delicacyDto) {
        logger.info("Adding delicacy to vendor id: {}", vendorId);

        try {
            Delicacy delicacy = new Delicacy();
            delicacy.setName(delicacyDto.name());
            delicacy.setPrice(delicacyDto.price());
            delicacy.setDescription(delicacyDto.description());
            delicacy.setImagePath(delicacyDto.imagePath());

            Delicacy savedDelicacy = foodVendorService.addDelicacyToVendor(vendorId, delicacy);
            logger.info("Delicacy created successfully with id: {}", savedDelicacy.getId());

            return new ResponseEntity<>(savedDelicacy, HttpStatus.CREATED);

        } catch (Exception e) {
            logger.error("Error adding delicacy to vendor {}: {}", vendorId, e.getMessage());
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Failed to add delicacy: " + e.getMessage()));
        }
    }

    @PostMapping("/{vendorId}/dishes/batch")
    @Transactional
    public ResponseEntity<?> addDelicacyBatchToVendor(
            @PathVariable Long vendorId,
            @RequestBody @Valid List<DelicacyDto> delicacyDtoList) {

        try {
            // Validate vendor exists
            FoodVendor vendor = foodVendorService.getVendorById(vendorId);
            if (vendor == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Vendor not found with id: " + vendorId));
            }

            // Convert DTOs to entities
            List<Delicacy> delicacies = delicacyDtoList.stream()
                    .map(dto -> {
                        Delicacy delicacy = new Delicacy();
                        delicacy.setName(dto.name());
                        delicacy.setPrice(dto.price());
                        delicacy.setDescription(dto.description());
                        delicacy.setImagePath(dto.imagePath());
                        delicacy.setAverageRating(0.0);
                        delicacy.setTotalRatings(0);
                        return delicacy;
                    })
                    .collect(Collectors.toList());

            // Batch save
            List<Delicacy> savedDelicacies = foodVendorService.addDelicaciesToVendor(vendor, delicacies);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(savedDelicacies);

        } catch (Exception e) {
            logger.error("Error adding batch to vendor {}: {}", vendorId, e.getMessage(), e);
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Failed to add delicacies: " + e.getMessage()));
        }
    }

    // Update existing dish
    @PutMapping("/{vendorId}/dishes/{delicacyId}")
    public ResponseEntity<Delicacy> updateDelicacy(
            @PathVariable Long vendorId,
            @PathVariable Long delicacyId,
            @RequestBody @Valid DelicacyDto delicacyDto) {

        Delicacy delicacyDetails = new Delicacy();
        delicacyDetails.setName(delicacyDto.name());
        delicacyDetails.setPrice(delicacyDto.price());
        delicacyDetails.setDescription(delicacyDto.description());
        delicacyDetails.setImagePath(delicacyDto.imagePath());

        Delicacy updatedDelicacy = foodVendorService.updateDelicacy(vendorId, delicacyId, delicacyDetails);
        return ResponseEntity.ok(updatedDelicacy);
    }

    // Delete dish from vendor
    @DeleteMapping("/{vendorId}/dishes/{delicacyId}")
    public ResponseEntity<Void> removeDelicacy(
            @PathVariable Long vendorId,
            @PathVariable Long delicacyId) {

        foodVendorService.removeDelicacyFromVendor(vendorId, delicacyId);
        return ResponseEntity.noContent().build();
    }

    // Additional endpoints
    @GetMapping("/city/{city}")
    public ResponseEntity<List<FoodVendor>> getVendorsByCity(@PathVariable String city) {
        City cityEnum = City.fromString(city);
        return ResponseEntity.ok(foodVendorService.getVendorsByCity(cityEnum));
    }

    @GetMapping("/delivery/available")
    public ResponseEntity<List<FoodVendor>> getVendorsWithDelivery() {
        return ResponseEntity.ok(foodVendorService.getVendorsWithDelivery());
    }
}