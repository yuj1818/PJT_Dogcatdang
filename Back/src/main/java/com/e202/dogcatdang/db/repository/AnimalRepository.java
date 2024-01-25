package com.e202.dogcatdang.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e202.dogcatdang.db.entity.Animal;

public interface AnimalRepository extends JpaRepository<Animal, Long> {
}
