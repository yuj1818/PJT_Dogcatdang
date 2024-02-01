package com.e202.dogcatdang.lostanimal.controller;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e202.dogcatdang.animal.dto.RequestAnimalDto;
import com.e202.dogcatdang.lostanimal.dto.RequestLostAnimalDto;
import com.e202.dogcatdang.lostanimal.dto.ResponseSavedIdDto;
import com.e202.dogcatdang.lostanimal.service.LostAnimalService;
import com.e202.dogcatdang.user.jwt.JWTUtil;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/lost-animals")
public class LostAnimalController {

	private JWTUtil jwtUtil;
	private final LostAnimalService lostAnimalService;

	// 실종 동물 정보 등록
	@PostMapping("")
	public ResponseEntity<ResponseSavedIdDto> registerLostAnimal(@RequestHeader("Authorization") String token, @RequestBody RequestLostAnimalDto requestLostAnimalDto) throws IOException {

		// animalType에 맞는 breed를 입력했는지 확인하는 기능
		if (!requestLostAnimalDto.isValid()) {
			throw new IllegalArgumentException("품종이 동물 타입과 맞지 않습니다.");
		}

		ResponseSavedIdDto responseSavedIdDto = lostAnimalService.save(requestLostAnimalDto, token);
		return ResponseEntity.ok(responseSavedIdDto);
	}

}
