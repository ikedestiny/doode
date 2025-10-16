package com.dev.doode.model;

import jakarta.persistence.Entity;
import lombok.Data;

@Entity
@Data
public class Person {
    private String username;
    private String password;
    private PType pType;
    private String telegram;

}
