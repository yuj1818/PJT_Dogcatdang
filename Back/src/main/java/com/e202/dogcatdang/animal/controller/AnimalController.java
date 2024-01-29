package com.e202.dogcatdang.animal.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e202.dogcatdang.animal.dto.RequestAnimalDto;
import com.e202.dogcatdang.animal.dto.ResponseAnimalDto;
import com.e202.dogcatdang.animal.dto.ResponseAnimalListDto;
import com.e202.dogcatdang.animal.dto.ResponseSavedIdDto;
import com.e202.dogcatdang.animal.service.AnimalService;
import com.e202.dogcatdang.db.entity.Animal;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/animals")
public class AnimalController {

	private final AnimalService animalService;

	// 동물 정보 등록
	@PostMapping("")
	public ResponseEntity<ResponseSavedIdDto> registerAnimal(@RequestBody RequestAnimalDto requestAnimalDto) throws IOException {
		ResponseSavedIdDto responseSavedIdDto = animalService.save(requestAnimalDto);
		return ResponseEntity.ok(responseSavedIdDto);
	}

	/* 동물 목록 조회
	*  모든 동물을 리스트로 불러옴
	*/
	@GetMapping("")
	public ResponseEntity<List<ResponseAnimalListDto>> findAll() {
		List<ResponseAnimalListDto> animalList = animalService.findAll();
		return ResponseEntity.ok(animalList);
	}

	/* 동물 정보 상세 조회
		동물 데이터 하나를 불러옴 */
	@GetMapping("/{animalId}")
	public ResponseEntity<ResponseAnimalDto> findAnimal(@PathVariable long animalId) {
		ResponseAnimalDto animalDto = animalService.findById(animalId);
		return ResponseEntity.ok(animalDto);
	}

	/* 동물 정보 수정 */
	@PutMapping("/{animalId}")
	public ResponseEntity<Long> update(@PathVariable long animalId, @RequestBody RequestAnimalDto requestAnimalDto) throws IOException {
		Animal animal = animalService.update(animalId, requestAnimalDto);
		return ResponseEntity.ok(animal.getAnimalId());
	}


}
