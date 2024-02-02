package com.e202.dogcatdang.db.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.e202.dogcatdang.db.entity.Animal;
import com.e202.dogcatdang.db.entity.LostAnimal;

@Repository
public interface LostAnimalRepository extends JpaRepository<LostAnimal, Long> {
	// fetch join으로 user + animal 정보 가져오기
	@Query("SELECT a FROM LostAnimal a LEFT JOIN FETCH a.user WHERE a.lostAnimalId = :lostAnimalId")
	Optional<LostAnimal> findByIdWithUser(@Param("lostAnimalId") Long lostAnimalId);
}
