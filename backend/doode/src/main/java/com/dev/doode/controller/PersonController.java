package com.dev.doode.controller;

import com.dev.doode.dto.PersonDto;
import com.dev.doode.model.PType;
import com.dev.doode.model.Person;
import com.dev.doode.security.JwtUtil;
import com.dev.doode.service.PersonService;
import com.dev.doode.util.StringEncoder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doode/person")
public class PersonController {
    private final PersonService personService;
    private final JwtUtil jwtUtil;
    private final StringEncoder encoder;

    public PersonController (PersonService personService, JwtUtil jwtUtil, StringEncoder encoder){
        this.personService = personService;
        this.jwtUtil = jwtUtil;
        this.encoder = encoder;
    }

    @PostMapping("/register")
    public Person registerNewPerson(@RequestBody PersonDto personDto){
        Person person = new Person();
        person.setUsername(personDto.username());
        person.setPassword(encoder.encode(personDto.password()));
        person.setPType(PType.CLIENT);
        return personService.addNewUser(person);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody PersonDto personDto){
        if (personService.findByUsername(personDto.username()) == null &&
                encoder.check(personDto.password(),personService.findByUsername(personDto.username()).getPassword())){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(jwtUtil.generateToken(personDto.username()));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Person>> getAll(){
        return ResponseEntity.ok(personService.getAllPersons());
    }

}
