package com.dev.doode.repository;// package com.dev.doode.repository;

import com.dev.doode.helpers.City;
import com.dev.doode.model.Delicacy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DelicacyRepository extends JpaRepository<Delicacy, Long>, JpaSpecificationExecutor<Delicacy> {

    // Basic search by name
    List<Delicacy> findByNameContainingIgnoreCase(String name);

    // Search with pagination
    Page<Delicacy> findByNameContainingIgnoreCase(String name, Pageable pageable);

    // Find delicacies by price range
    List<Delicacy> findByPriceBetween(Integer minPrice, Integer maxPrice);

    // Find delicacies with price less than or equal to
    List<Delicacy> findByPriceLessThanEqual(Integer maxPrice);

    // Find top-rated delicacies (you might want to add a rating field to Delicacy)
    List<Delicacy> findTop10ByOrderByAverageRatingDesc();

    // Search across multiple vendors
    @Query("SELECT d FROM Delicacy d JOIN d.foodVendor v WHERE " +
            "LOWER(d.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(v.name) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Delicacy> searchDelicaciesAndVendors(@Param("query") String query);

    // Find delicacies by vendor ID
    @Query("SELECT d FROM Delicacy d WHERE d.foodVendor.id = :vendorId")
    List<Delicacy> findByVendorId(@Param("vendorId") Long vendorId);

    // Find delicacies by city
    @Query("SELECT d FROM Delicacy d JOIN d.foodVendor v WHERE v.city = :city")
    List<Delicacy> findByFoodVendorCity(@Param("city") City city);


}