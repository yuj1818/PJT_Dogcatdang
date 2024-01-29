package com.e202.dogcatdang.animal.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.e202.dogcatdang.animal.dto.RequestAnimalDto;
import com.e202.dogcatdang.animal.dto.ResponseAnimalDto;
import com.e202.dogcatdang.animal.dto.ResponseAnimalListDto;
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

	@Override
	@Transactional
	public List<ResponseAnimalListDto> findAll() {
		List<Animal> animalList = animalRepository.findAll();
		List<ResponseAnimalListDto> animalDtoList = new ArrayList<>();

		for (Animal animal : animalList) {
			System.out.println("animal = " + animal);
			ResponseAnimalListDto animalDto = ResponseAnimalListDto.builder()
				.animal(animal)
				.build();

			animalDtoList.add(animalDto);
		}

		return animalDtoList;
	}

	@Override
	@Transactional
	public ResponseAnimalDto findById(Long animalId) {
		Animal animal = animalRepository.findById(animalId)
			.orElseThrow(() -> new NoSuchElementException("해당 Id의 동물이 없습니다."));
		return new ResponseAnimalDto(animal);
	}

	@Override
	@Transactional
	public Animal update(Long animalId, RequestAnimalDto request) throws IOException {
		// 특정 동물 데이터 조회
		Animal animal = animalRepository.findById(animalId)
			.orElseThrow(() -> new IllegalArgumentException("해당 Id의 동물을 찾을 수 없습니다."));

		animal.update(request.getAnimalType(), request.getBreed(), request.getAge(), request.getWeight(),
			request.getColor(),
			request.getRescueDate(), request.getRescueLocation(), request.getIsNeuter(), request.getGender(),
			request.getFeature(),request.getState(), request.getImgName(), request.getImgUrl());

		return animal;
	}

}
