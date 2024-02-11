package com.e202.dogcatdang.db.repository;

import java.util.List;

import com.e202.dogcatdang.animal.dto.ResponseAnimalDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.e202.dogcatdang.db.entity.Animal;
import com.e202.dogcatdang.db.entity.AnimalLike;
import com.e202.dogcatdang.db.entity.User;

@Repository
public interface AnimalLikeRepository extends JpaRepository<AnimalLike, Long> {


	List<AnimalLike> findByUser(User user);
	//


	boolean existsByAnimalAndUser(Animal animal, User user);

	AnimalLike findByUserAndAnimal(User user, Animal animal);

	List<AnimalLike> findByUserId(Long userId);
}
