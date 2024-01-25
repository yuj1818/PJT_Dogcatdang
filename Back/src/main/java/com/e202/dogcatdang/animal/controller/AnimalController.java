package com.e202.dogcatdang.animal.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e202.dogcatdang.animal.dto.AnimalRequestDto;
import com.e202.dogcatdang.animal.service.AnimalService;
import com.e202.dogcatdang.db.entity.Animal;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/animals")
public class AnimalController {

	private final AnimalService animalService;

	@PostMapping("")
	public ResponseEntity<Animal> registerAnimal(@RequestBody AnimalRequestDto animalRequestDto) {
		animalService.save(animalRequestDto);
		return new ResponseEntity(HttpStatus.OK);
	}
}
