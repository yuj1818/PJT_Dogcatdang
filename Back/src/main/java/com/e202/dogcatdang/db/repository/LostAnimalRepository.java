package com.e202.dogcatdang.db.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.e202.dogcatdang.db.entity.Animal;
import com.e202.dogcatdang.db.entity.LostAnimal;

@Repository
public interface LostAnimalRepository extends JpaRepository<LostAnimal, Long>, JpaSpecificationExecutor<LostAnimal> {
	// fetch join으로 user + animal 정보 가져오기
	@Query("SELECT l FROM LostAnimal l LEFT JOIN FETCH l.user WHERE l.lostAnimalId = :lostAnimalId")
	Optional<LostAnimal> findByIdWithUser(@Param("lostAnimalId") Long lostAnimalId);

	@Query("SELECT l FROM LostAnimal l JOIN FETCH l.user")
	Page<LostAnimal> findAllWithUser(PageRequest pageRequest);

	List<LostAnimal> findByState(LostAnimal.State state);
}
