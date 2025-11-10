package com.dev.doode.service;

import com.dev.doode.helpers.PType;
import com.dev.doode.model.Person;
import com.dev.doode.repository.PersonRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
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
    public Person findByEmail(String email){return personRepository.findByEmail(email).getFirst();}

    @Transactional
    public void setTypeAsBusiness(Long id){
        int updatedCount = personRepository.updatePType(id, PType.VENDOR);
        log.info("Updated {} records", updatedCount);
    }

    public void deletePerson(Integer id) {
        personRepository.deleteById(Long.valueOf(id));
    }
}
