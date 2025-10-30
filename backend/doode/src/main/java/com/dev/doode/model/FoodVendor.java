package com.dev.doode.model;

import com.dev.doode.helpers.Rating;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class FoodVendor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Vendor name is required")
    private String name;
    @NotNull(message = "City is required")
    private City city;
    @NotNull(message = "Business owner type is required")
    @OneToOne
    @JoinColumn(name = "owner_id")
    public Person businessOwner;
    private String address;
    private Boolean delivery;
    private String menuImagePath;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "food_vendor_id")
    private List<Delicacy> delicacies =  new ArrayList<>();
    private Rating rating;
    private List<String> reviews;
}
