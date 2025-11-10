package com.dev.doode.controller;// package com.dev.doode.controller;

import com.dev.doode.helpers.City;
import com.dev.doode.model.Delicacy;
import com.dev.doode.service.DelicacySearchService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doode/search")
public class SearchController {

    private final DelicacySearchService delicacySearchService;

    public SearchController(DelicacySearchService delicacySearchService) {
        this.delicacySearchService = delicacySearchService;
    }

    @GetMapping("/delicacies")
    public ResponseEntity<List<Delicacy>> searchDelicacies(
            @RequestParam(required = false) String query) {
        List<Delicacy> results = delicacySearchService.searchDelicacies(query);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/delicacies/advanced")
    public ResponseEntity<Page<Delicacy>> advancedSearch(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) City city,
            @RequestParam(required = false) Integer minPrice,
            @RequestParam(required = false) Integer maxPrice,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Delicacy> results = delicacySearchService.advancedSearch(
                query, city, minPrice, maxPrice, pageable);

        return ResponseEntity.ok(results);
    }

    @GetMapping("/delicacies/city/{city}")
    public ResponseEntity<List<Delicacy>> getDelicaciesByCity(@PathVariable City city) {
        List<Delicacy> results = delicacySearchService.findDelicaciesByCity(city);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/delicacies/vendor/{vendorId}")
    public ResponseEntity<List<Delicacy>> getDelicaciesByVendor(@PathVariable Long vendorId) {
        List<Delicacy> results = delicacySearchService.findDelicaciesByVendor(vendorId);
        return ResponseEntity.ok(results);
    }
}