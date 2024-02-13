package com.e202.dogcatdang.animal.service;

import java.util.List;

import com.e202.dogcatdang.db.entity.Animal;
import com.e202.dogcatdang.db.entity.User;

public interface AnimalLikeService {
	void likeAnimal(Long userId, Animal animal);

	void unlikeAnimal(Long userId, Animal animal);

	// user가 animal에 like를 했는지 boolean 값으로 확인
	boolean isAnimalLikedByUser(Animal animal, User user);

}
