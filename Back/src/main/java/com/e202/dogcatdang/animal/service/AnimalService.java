package com.e202.dogcatdang.animal.service;

import java.io.IOException;

import com.e202.dogcatdang.animal.dto.RequestAnimalDto;
import com.e202.dogcatdang.animal.dto.ResponseAnimalDto;
import com.e202.dogcatdang.animal.dto.ResponseSavedIdDto;
import com.e202.dogcatdang.db.entity.Animal;

public interface AnimalService {
	ResponseSavedIdDto save(RequestAnimalDto requestAnimalDto) throws IOException;

	ResponseAnimalDto findById(Long animalId);

	Animal update(Long animalId, RequestAnimalDto requestAnimalDto) throws IOException;

}
