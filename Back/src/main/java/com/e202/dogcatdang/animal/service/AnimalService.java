package com.e202.dogcatdang.animal.service;

import java.io.IOException;
import java.util.List;

import com.e202.dogcatdang.animal.dto.RequestAnimalDto;
import com.e202.dogcatdang.animal.dto.ResponseAnimalDto;
import com.e202.dogcatdang.animal.dto.ResponseAnimalListDto;
import com.e202.dogcatdang.animal.dto.ResponseSavedIdDto;
import com.e202.dogcatdang.db.entity.Animal;

public interface AnimalService {
	ResponseSavedIdDto save(RequestAnimalDto requestAnimalDto) throws IOException;

	List<ResponseAnimalListDto> findAll();

	ResponseAnimalDto findById(Long animalId);

	Animal update(Long animalId, RequestAnimalDto requestAnimalDto) throws IOException;

}
