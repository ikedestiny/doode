package com.dev.doode.service;

import com.dev.doode.model.Person;
import com.dev.doode.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonService {
    @Autowired
    private PersonRepository personRepository;


    public Person addNewUser(Person person){
        return personRepository.save(person);
    }
}
