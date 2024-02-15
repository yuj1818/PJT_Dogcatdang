package com.e202.dogcatdang.db.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.e202.dogcatdang.animal.dto.ResponseAnimalDto;
import com.e202.dogcatdang.db.entity.Animal;
import com.e202.dogcatdang.db.entity.Reservation;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long>, JpaSpecificationExecutor<Animal> {
	// fetch join으로 animalId에 따른 animal 정보와 각 animal 별 user 정보 가져오기
	@Query("SELECT a FROM Animal a LEFT JOIN FETCH a.user WHERE a.animalId = :animalId")
	Optional<Animal> findByIdWithUser(@Param("animalId") Long animalId);

	// 전체 animal 정보와 각 animal 별 user 정보 가져오기
	@Query("SELECT a FROM Animal a JOIN FETCH a.user")
	Page<Animal> findAllWithUser(PageRequest pageRequest);

	// state 상태가 일치하는 모든 animal 정보 가져오기
	@Query("SELECT a FROM Animal a WHERE a.state = :state")
	List<Animal> findByState(Animal.State state);

	// userId와 state가 일치하는 모든 animal 정보 가져오기
	List<Animal> findByUserIdAndState(Long userId, Animal.State state);

	// 현재 로그인한 회원(기관)의 아이디로 등록된 동물 수 계산
	Integer countByUser_Id(Long shelterId);

	// 현재 로그인한 회원(기관)과 동물 보호 상태로 동물 수 계산
	Integer countByStateAndUser_Id(Animal.State state, Long shelterId);

	// 현재 로그인한 회원(기관)의 전체 동물 데이터를 페이징해 가져오기
	Page<Animal> findByUser_Id(Long shelterId, PageRequest pageRequest);

}
