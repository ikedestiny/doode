package com.dev.doode.controller;

import com.dev.doode.dto.PersonDto;
import com.dev.doode.model.Client;
import com.dev.doode.helpers.PType;
import com.dev.doode.model.Person;
import com.dev.doode.security.JwtUtil;
import com.dev.doode.service.ClientService;
import com.dev.doode.service.PersonService;
import com.dev.doode.util.StringEncoder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doode/person")
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
        client.setPassword(encoder.encode(personDto.password()));
        client.setPType(PType.CLIENT);
        return clientService.saveClient(client);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody PersonDto personDto) {
        Person person = personService.findByUsername(personDto.username());
        if (person == null || !encoder.check(personDto.password(), person.getPassword())) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }

        String token = jwtUtil.generateToken(person.getUsername());
        return ResponseEntity.ok(token);
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
