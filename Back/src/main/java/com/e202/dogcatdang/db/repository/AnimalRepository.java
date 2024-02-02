package com.e202.dogcatdang.db.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.e202.dogcatdang.db.entity.Animal;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {
	// fetch join으로 user + animal 정보 가져오기
	@Query("SELECT a FROM Animal a LEFT JOIN FETCH a.user WHERE a.animalId = :animalId")
	Optional<Animal> findByIdWithUser(@Param("animalId") Long animalId);

	@Query("SELECT a FROM Animal a JOIN FETCH a.user")
	Page<Animal> findAllWithUser(PageRequest pageRequest);

}
