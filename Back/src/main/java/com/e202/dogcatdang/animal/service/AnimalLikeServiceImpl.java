package com.e202.dogcatdang.animal.service;

import org.springframework.stereotype.Service;

import com.e202.dogcatdang.db.entity.Animal;
import com.e202.dogcatdang.db.entity.AnimalLike;
import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.db.repository.AnimalLikeRespository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AnimalLikeServiceImpl implements AnimalLikeService{

	// private final AnimalLikeRespository animalLikeRespository;
	//
	// // user가 animal에 like를 했는지 확인
	// public boolean isAnimalLikedByUser(Long userId, Long animalId) {
	// 	return animalLikeRespository.existsByUserIdAndAnimalId(userId, animalId);
	// }
	//
	// // like 추가
	// public void addLike(User user, Animal animal) {
	// 	AnimalLike animalLike = new AnimalLike();
	//
	// }
}
