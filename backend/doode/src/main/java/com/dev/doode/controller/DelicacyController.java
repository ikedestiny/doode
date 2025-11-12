package com.dev.doode.controller;

import com.dev.doode.helpers.City;
import com.dev.doode.service.DelicacyService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/doode/dishes")
@Slf4j
public class DelicacyController {
    @Autowired
    DelicacyService delicacyService;

    @GetMapping
    public ResponseEntity<?> getAAllDelicacies(){
        return ResponseEntity.ok(delicacyService.getAllDelicacies());
    }

    @GetMapping("/{city}")
    public ResponseEntity<?> dishesInCity(@PathVariable String city){
        City place = City.fromString(city);
        log.info("City: {}",place);
        return ResponseEntity.ok(delicacyService.getAllByCity(place));}
}
