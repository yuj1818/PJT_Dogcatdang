package com.e202.dogcatdang.animal.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.e202.dogcatdang.animal.dto.ResponseShelterAnimalCountDto;
import com.e202.dogcatdang.animal.dto.ResponseShelterAnimalDto;
import com.e202.dogcatdang.animal.dto.ResponseShelterAnimalPageDto;
import com.e202.dogcatdang.animal.service.AnimalService;
import com.e202.dogcatdang.user.jwt.JWTUtil;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/shelter/animals")
public class AnimalShelterController {

	private JWTUtil jwtUtil;
	private final AnimalService animalService;

	// 기관의 보호 동물 수 데이터 리스트
	@GetMapping("/count")
	public ResponseEntity<ResponseShelterAnimalCountDto> countAnimals(@RequestHeader("Authorization") String token) {
		// 토큰에서 사용자 아이디(pk) 추출
		Long shelterId = jwtUtil.getUserId(token.substring(7));
		ResponseShelterAnimalCountDto countDto = animalService.countAnimals(shelterId);

		return ResponseEntity.ok(countDto);
	}

	// 기관의 보호 동물 정보 조회
	@GetMapping("")
	public ResponseEntity<ResponseShelterAnimalPageDto> findShelterAnimal(@RequestParam(defaultValue = "1") int page,
		@RequestParam(defaultValue = "5") int recordSize, @RequestHeader("Authorization") String token) {
		// 토큰에서 사용자 아이디(pk) 추출
		Long shelterId = jwtUtil.getUserId(token.substring(7));
		ResponseShelterAnimalPageDto animalPage = animalService.findShelterAnimal(page, recordSize, shelterId);

		return ResponseEntity.ok(animalPage);
	}

}
