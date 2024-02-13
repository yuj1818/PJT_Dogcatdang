package com.e202.dogcatdang.db.repository;

import java.nio.ByteBuffer;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e202.dogcatdang.db.entity.StreamingAnimal;

public interface StreamingAnimalRepository extends JpaRepository<StreamingAnimal, Long> {
	StreamingAnimal findByAnimalAnimalId(Long id);
}
