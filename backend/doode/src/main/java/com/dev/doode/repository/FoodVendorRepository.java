package com.dev.doode.repository;

import com.dev.doode.helpers.City;
import com.dev.doode.model.FoodVendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodVendorRepository extends JpaRepository<FoodVendor, Long> {

    @Modifying
    @Query("UPDATE FoodVendor fv " +
            "SET fv.totalRatings = fv.totalRatings + 1, " +
            "    fv.averageRating = ((fv.totalRatings * fv.averageRating) + :rate) / (fv.totalRatings + 1) " +
            "WHERE fv.id = :id")
    int updateRatingAtomic(@Param("id") Long id, @Param("rate") Integer rate);

    List<FoodVendor> findByCity(City city);

    List<FoodVendor> findByDeliveryTrue();
    List<FoodVendor> findByCityAndDeliveryTrue(City city);
}
