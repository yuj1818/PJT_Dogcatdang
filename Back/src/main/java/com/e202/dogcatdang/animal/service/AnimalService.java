package com.e202.dogcatdang.animal.service;

import java.io.IOException;

import com.e202.dogcatdang.animal.dto.RequestAnimalDto;
import com.e202.dogcatdang.animal.dto.ResponseAnimalDto;
import com.e202.dogcatdang.animal.dto.ResponseSavedIdDto;

public interface AnimalService {
	ResponseSavedIdDto save(RequestAnimalDto requestAnimalDto) throws IOException;

	ResponseAnimalDto findById(Long animalId);
}
