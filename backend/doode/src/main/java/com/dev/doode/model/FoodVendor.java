package com.dev.doode.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.ArrayList;
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
    @NotBlank(message = "Address is required")
    private String address;
    private Boolean delivery;
    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^\\+?[0-9\\-\\s()]{10,}$", message = "Invalid phone number format")
    private String phoneNumber;
    private String menuImagePath;
    @Email(message = "Invalid email format")
    private String email;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "food_vendor_id")
    private ArrayList<Delicacy> delicacies =  new ArrayList<>();
}
