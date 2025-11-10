package com.dev.doode.dto;

import com.dev.doode.model.Person;

public class LoginResponse {
    private Person user;
    private String token;

    public LoginResponse() {}

    public LoginResponse(Person user, String token) {
        this.user = user;
        this.token = token;
    }

    // Getters and Setters
    public Person getUser() {
        return user;
    }

    public void setUser(Person user) {
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}