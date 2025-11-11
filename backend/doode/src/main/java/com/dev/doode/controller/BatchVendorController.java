package com.dev.doode.controller;

import com.dev.doode.model.FoodVendor;
import com.dev.doode.service.BatchVendorService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.logging.Logger;
import java.util.stream.Collectors;


@Slf4j
@RestController
@RequestMapping("/api/doode/vendors/batch")
public class BatchVendorController {

    @Autowired
    private BatchVendorService batchVendorService;

    @PostMapping("/african-delicacies")
    public ResponseEntity<?> createAfricanVendors(@RequestParam(defaultValue = "50") int count) {
        try {
            List<FoodVendor> vendors = batchVendorService.createAfricanVendors(count);

            Map<String, Object> response = Map.of(
                    "message", "Batch creation completed",
                    "createdCount", vendors.size(),
                    "failedCount", count - vendors.size()
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Failed: " + e.getMessage()));
        }
    }
}






