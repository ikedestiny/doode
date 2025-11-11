package com.dev.doode.controller;

import com.dev.doode.dto.LoginDto;
import com.dev.doode.dto.LoginResponse;
import com.dev.doode.dto.PersonDto;
import com.dev.doode.model.Client;
import com.dev.doode.helpers.PType;
import com.dev.doode.model.Person;
import com.dev.doode.security.JwtUtil;
import com.dev.doode.service.ClientService;
import com.dev.doode.service.PersonService;
import com.dev.doode.util.StringEncoder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doode/auth")
public class AuthController {

    private final PersonService personService;
    private final ClientService clientService;
    private final JwtUtil jwtUtil;
    private final StringEncoder encoder;

    public AuthController(PersonService personService, ClientService clientService, JwtUtil jwtUtil, StringEncoder encoder) {
        this.personService = personService;
        this.clientService = clientService;
        this.jwtUtil = jwtUtil;
        this.encoder = encoder;
    }

    @PostMapping("/register")
    public Client registerNewClient(@RequestBody PersonDto personDto) {
        Client client = new Client();
        client.setUsername(personDto.username());
        client.setEmail(personDto.email());
        client.setPassword(encoder.encode(personDto.password()));
        client.setPType(PType.CLIENT);
        return clientService.saveClient(client);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        try {
            Person person = personService.findByEmail(loginDto.email());
            if (person == null || !encoder.check(loginDto.password(), person.getPassword())) {
                return ResponseEntity.status(401).body("Invalid username or password");
            }

            String token = jwtUtil.generateToken(person.getUsername());
            LoginResponse response = new LoginResponse(person, token);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Login failed: " + e.getMessage());
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(@RequestHeader("Authorization") String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7); // Remove "Bearer " prefix
            Person person = personService.findByUsername(jwtUtil.extractUsername(token));
            return ResponseEntity.ok(person);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<Person>> getAll() {
        return ResponseEntity.ok(personService.getAllPersons());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        personService.deletePerson(id);
        return ResponseEntity.noContent().build();
    }
}
