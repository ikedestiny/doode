package com.dev.doode.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.ArrayList;
@Entity
@Data
public class FoodVendor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String name;
    private City city;
    public PType businessOwner;
    private String address;
    private Boolean delivery;
    private String phoneNumber;
    private String menuImagePath;
    private ArrayList<Delicacy> delicacies;
}
