package com.e202.dogcatdang.db.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.e202.dogcatdang.animal.dto.ResponseAnimalDto;
import com.e202.dogcatdang.db.entity.Animal;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {
	// fetch join으로 animalId에 따른 animal 정보와 각 animal 별 user 정보 가져오기
	@Query("SELECT a FROM Animal a LEFT JOIN FETCH a.user WHERE a.animalId = :animalId")
	Optional<Animal> findByIdWithUser(@Param("animalId") Long animalId);

	// 전체 animal 정보와 각 animal 별 user 정보 가져오기
	@Query("SELECT a FROM Animal a JOIN FETCH a.user")
	Page<Animal> findAllWithUser(PageRequest pageRequest);

	// state 상태에 따른 animal 정보 가져오기
	@Query("SELECT a FROM Animal a WHERE a.state = :state")
	List<Animal> findByState(Animal.State state);

	List<Animal> findAll(Specification<Animal> specification);
}
