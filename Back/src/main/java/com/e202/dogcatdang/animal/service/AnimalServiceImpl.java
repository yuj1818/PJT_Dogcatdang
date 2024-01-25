package com.e202.dogcatdang.animal.service;

import java.io.IOException;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.e202.dogcatdang.animal.dto.RequestAnimalDto;
import com.e202.dogcatdang.animal.dto.ResponseAnimalDto;
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

	public ResponseAnimalDto findById(Long animalId) {
		Animal animal = animalRepository.findById(animalId)
			.orElseThrow(() -> new NoSuchElementException("해당 Id의 동물이 없습니다."));
		return new ResponseAnimalDto(animal);
	}
}
