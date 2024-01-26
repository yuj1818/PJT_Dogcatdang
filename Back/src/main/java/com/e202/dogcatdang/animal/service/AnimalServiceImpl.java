package com.e202.dogcatdang.animal.service;

import java.io.IOException;

import org.springframework.stereotype.Service;

import com.e202.dogcatdang.animal.dto.RequestAnimalDto;
import com.e202.dogcatdang.animal.dto.ResponseSavedIdDto;
import com.e202.dogcatdang.db.entity.Animal;
import com.e202.dogcatdang.db.repository.AnimalRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AnimalServiceImpl implements AnimalService{

	private final AnimalRepository animalRepository;
	@Override
	public ResponseSavedIdDto save(RequestAnimalDto requestAnimalDto) throws IOException {
		Animal animal = requestAnimalDto.toEntity();
		Long savedId = animalRepository.save(animal).getAnimalId();
		return new ResponseSavedIdDto(savedId);
	}
}
