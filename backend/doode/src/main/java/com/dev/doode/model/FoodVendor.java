package com.dev.doode.model;

import com.dev.doode.helpers.City;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import org.antlr.v4.runtime.misc.Pair;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
    private Integer totalRatings;
    private Double averageRating;
    private Pair<Integer, Double> Rating;
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private Map<Long, String> reviews;
    @OneToMany(mappedBy = "vendor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Order> orders = new ArrayList<>();
}
