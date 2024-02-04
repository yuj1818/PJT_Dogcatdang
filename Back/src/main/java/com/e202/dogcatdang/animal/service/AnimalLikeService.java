package com.e202.dogcatdang.animal.service;

import com.e202.dogcatdang.db.entity.Animal;
import com.e202.dogcatdang.db.entity.User;

public interface AnimalLikeService {
	void likeAnimal(Long userId, Animal animal);

	void unlikeAnimal(Long userId, Animal animal);

	boolean isAnimalLikedByUser(Animal animal, User user);
}
