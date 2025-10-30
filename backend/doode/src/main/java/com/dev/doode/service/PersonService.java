package com.dev.doode.service;

import com.dev.doode.model.Person;
import com.dev.doode.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PersonService {
    @Autowired
    private PersonRepository personRepository;


    public Person addNewUser(Person person){
        return personRepository.save(person);
    }

    public List<Person> getAllPersons(){
        return personRepository.findAll();
    }

    public Person findPersonById(Long id){
        return personRepository.findById(id).isPresent() ? personRepository.findById(id).get():null;
    }

    public Person findByUsername(String username){
        return personRepository.findByUsername(username).getFirst();
    }
}
