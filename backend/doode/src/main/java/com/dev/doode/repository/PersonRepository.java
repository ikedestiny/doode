package com.dev.doode.repository;

import com.dev.doode.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
    List<Person> findByUsername(String username);
    @Modifying
    @Query("UPDATE person p SET p.p_type = :pType WHERE p.id = :id")
    int updatePType(@Param("id") Long id, @Param("pType") Integer pType);
}
