package com.dev.doode.model;

import com.dev.doode.helpers.PType;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @Column(unique = true)
    private String username;
    private String password;
    private PType pType;
    @Pattern(regexp = "^\\+?[0-9\\-\\s()]{10,}$", message = "Invalid phone number format")
    private String phoneNumber;
    @Email(message = "Invalid email format")
    private String email;
}
