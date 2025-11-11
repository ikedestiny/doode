package com.dev.doode.service;

import com.dev.doode.dto.VendorDto;
import com.dev.doode.model.FoodVendor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@Slf4j
public class BatchVendorService {


    @Autowired
    private VendorCreationService vendorCreationService;

    private static final String[] RUSSIAN_CITIES = {
            "Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", "Kazan",
            "Nizhny Novgorod", "Chelyabinsk", "Samara", "Omsk", "Rostov-on-Don"
    };

    private static final String[] AFRICAN_DELICACIES = {
            "Jollof Rice", "Suya Spot", "Egusi Soup", "Pounded Yam", "Injera House",
            "Bobotie Corner", "Bunny Chow", "Tagine Delight", "Couscous King"
    };

    public List<FoodVendor> createAfricanVendors(int count) {
        List<FoodVendor> createdVendors = new ArrayList<>();
        Random random = new Random();

        for (int i = 0; i < count; i++) {
            try {
                VendorDto vendorDto = createVendorDto(random, i);
                FoodVendor vendor = vendorCreationService.createVendorWithBusinessType(vendorDto);

                if (vendor.getId() != null) {
                    createdVendors.add(vendor);
                    log.info("Created vendor {}: {} in {}", i + 1, vendorDto.name(), vendorDto.city());
                }

            } catch (Exception e) {
                log.error("Failed to create vendor {}: {}", i + 1, e.getMessage());
                // Continue with next vendor
            }
        }

        log.info("Completed: {} vendors created successfully", createdVendors.size());
        return createdVendors;
    }

    private VendorDto createVendorDto(Random random, int index) {
        String city = RUSSIAN_CITIES[random.nextInt(RUSSIAN_CITIES.length)];
        String delicacy = AFRICAN_DELICACIES[random.nextInt(AFRICAN_DELICACIES.length)];
        String vendorName = delicacy + " - " + city + " #" + (index + 1);
        
        return new VendorDto(
                vendorName,
                city,
                5L,
                "Street " + (random.nextInt(100) + 1) + ", " + city,
                true,
                null,
                "RESTAURANT"
                
        );
    }
}