package com.e202.dogcatdang.animal.service;

import com.e202.dogcatdang.db.entity.Animal;

public interface AnimalLikeService {
	void likeAnimal(Long userId, Animal animal);

	void unlikeAnimal(Long userId, Animal animal);
}
