package com.dev.doode.service;// package com.dev.doode.service;

import com.dev.doode.helpers.City;
import com.dev.doode.model.Delicacy;
import com.dev.doode.repository.DelicacyRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DelicacySearchService {

    private final DelicacyRepository delicacyRepository;

    public DelicacySearchService(DelicacyRepository delicacyRepository) {
        this.delicacyRepository = delicacyRepository;
    }

    public List<Delicacy> searchDelicacies(String query) {
        if (query == null || query.trim().isEmpty()) {
            return delicacyRepository.findAll();
        }
        return delicacyRepository.findByNameContainingIgnoreCase(query);
    }

    public Page<Delicacy> searchDelicacies(String query, Pageable pageable) {
        if (query == null || query.trim().isEmpty()) {
            return delicacyRepository.findAll(pageable);
        }
        return delicacyRepository.findByNameContainingIgnoreCase(query, pageable);
    }

    public List<Delicacy> findDelicaciesByCity(City city) {
        return delicacyRepository.findByFoodVendorCity(city);
    }

    public List<Delicacy> findDelicaciesByVendor(Long vendorId) {
        return delicacyRepository.findByVendorId(vendorId);
    }

    public List<Delicacy> findDelicaciesByPriceRange(Integer minPrice, Integer maxPrice) {
        return delicacyRepository.findByPriceBetween(minPrice, maxPrice);
    }

    // Advanced search using Specifications
    public Page<Delicacy> advancedSearch(String query, City city, Integer minPrice,
                                         Integer maxPrice, Pageable pageable) {
        Specification<Delicacy> spec = Specification.where(null);

        if (query != null && !query.trim().isEmpty()) {
            spec = spec.and((root, cq, cb) ->
                    cb.or(
                            cb.like(cb.lower(root.get("name")), "%" + query.toLowerCase() + "%"),
                            cb.like(cb.lower(root.get("description")), "%" + query.toLowerCase() + "%")
                    ));
        }

        if (city != null) {
            spec = spec.and((root, cq, cb) ->
                    cb.equal(root.get("foodVendor").get("city"), city));
        }

        if (minPrice != null) {
            spec = spec.and((root, cq, cb) ->
                    cb.greaterThanOrEqualTo(root.get("price"), minPrice));
        }

        if (maxPrice != null) {
            spec = spec.and((root, cq, cb) ->
                    cb.lessThanOrEqualTo(root.get("price"), maxPrice));
        }

        return delicacyRepository.findAll(spec, pageable);
    }
}