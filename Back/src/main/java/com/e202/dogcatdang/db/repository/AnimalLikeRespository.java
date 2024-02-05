package com.e202.dogcatdang.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.e202.dogcatdang.db.entity.Animal;
import com.e202.dogcatdang.db.entity.AnimalLike;
import com.e202.dogcatdang.db.entity.User;

@Repository
public interface AnimalLikeRespository extends JpaRepository<AnimalLike, Long> {

	List<AnimalLike> findByUser(User user);

	boolean existsByAnimalAndUser(Animal animal, User user);

	AnimalLike findByUserAndAnimal(User user, Animal animal);
}
