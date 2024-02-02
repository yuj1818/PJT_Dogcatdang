package com.e202.dogcatdang.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.e202.dogcatdang.db.entity.AnimalLike;

@Repository
public interface AnimalLikeRespository extends JpaRepository<AnimalLike, Long> {

	// boolean existsByUserIdAndAnimalId(Long userId, Long animalId);
}
