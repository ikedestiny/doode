package com.dev.doode.repository;

import com.dev.doode.helpers.PType;
import com.dev.doode.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.SequencedCollection;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
    List<Person> findByUsername(String username);
    @Modifying
    @Query("UPDATE Person p SET p.pType = :pType WHERE p.id = :id")
    int updatePType(@Param("id") Long id, @Param("pType") PType pType);

    List<Person> findByEmail(String email);

    boolean existsByUsername(String username);
}
