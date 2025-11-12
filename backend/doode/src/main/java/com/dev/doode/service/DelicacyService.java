package com.dev.doode.service;

import com.dev.doode.helpers.City;
import com.dev.doode.model.Delicacy;
import com.dev.doode.repository.DelicacyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DelicacyService {
    @Autowired
    private DelicacyRepository delicacyRepository;

    public List<Delicacy> getAllDelicacies(){
        return delicacyRepository.findAll();
    }

    public List<Delicacy> getAllByCity(City city){
        return delicacyRepository.findByFoodVendorCity(city);
    }
}
