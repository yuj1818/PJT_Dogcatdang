package com.e202.dogcatdang.animal.service;

import org.springframework.stereotype.Service;

import com.e202.dogcatdang.animal.dto.AnimalRequestDto;
import com.e202.dogcatdang.db.repository.AnimalRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AnimalServiceImpl implements AnimalService{

	private final AnimalRepository animalRepository;
	@Override
	public void save(AnimalRequestDto animalRequestDto) {
		animalRepository.save(animalRequestDto.toEntity());
	}
}
