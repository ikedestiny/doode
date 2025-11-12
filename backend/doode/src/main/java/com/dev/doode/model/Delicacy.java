package com.dev.doode.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Delicacy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Integer price;
    private String imagePath;

    // Add description field for better search
    private String description;

    // Add relationship back to FoodVendor
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "food_vendor_id")
    @JsonIgnore
    private FoodVendor foodVendor;

    private String city ;

    // Consider adding rating fields for search/sorting
    private Double averageRating = 0.0;
    private Integer totalRatings = 0;

    @PostLoad
    @PrePersist
    @PreUpdate
    public void updateCity() {
        if (this.foodVendor != null && this.foodVendor.getCity() != null) {
            this.city = this.foodVendor.getCity().name();
        }
    }
}