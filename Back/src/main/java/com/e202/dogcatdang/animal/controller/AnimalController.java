package com.e202.dogcatdang.animal.controller;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e202.dogcatdang.animal.dto.RequestAnimalDto;
import com.e202.dogcatdang.animal.dto.ResponseAnimalDto;
import com.e202.dogcatdang.animal.dto.ResponseSavedIdDto;
import com.e202.dogcatdang.animal.service.AnimalService;
import com.e202.dogcatdang.db.entity.Animal;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/animals")
public class AnimalController {

	private final AnimalService animalService;

	@PostMapping("")
	public ResponseEntity<ResponseSavedIdDto> registerAnimal(@RequestBody RequestAnimalDto requestAnimalDto) throws IOException {
		ResponseSavedIdDto responseSavedIdDto = animalService.save(requestAnimalDto);
		return ResponseEntity.ok(responseSavedIdDto);
	}

	@GetMapping("/{animalId}")
	public ResponseEntity<ResponseAnimalDto> findAnimal(@PathVariable long animalId) {
		ResponseAnimalDto animalDto = animalService.findById(animalId);
		return ResponseEntity.ok().body(animalDto);
	}
}
