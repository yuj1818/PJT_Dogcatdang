package com.e202.dogcatdang.streaming.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.amazonaws.Response;
import com.e202.dogcatdang.animal.service.AnimalService;
import com.e202.dogcatdang.streaming.dto.RequestStreamingDto;
import com.e202.dogcatdang.streaming.dto.ResponseDto;
import com.e202.dogcatdang.streaming.dto.ResponseStreamingAnimalDto;
import com.e202.dogcatdang.streaming.service.StreamingService;
import com.e202.dogcatdang.user.jwt.JWTUtil;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/streamings")
public class StreamingController {

	private JWTUtil jwtUtil;
	private final AnimalService animalService;
	private final StreamingService streamingService;

	// 현재 로그인 한 기관의 보호 중인 동물 리스트 목록 반환
	@GetMapping("/animals")
	public ResponseEntity<List<ResponseStreamingAnimalDto>> findAnimal(@RequestHeader("Authorization") String token) {
		// 토큰에서 사용자 아이디(pk) 추출
		Long userId = jwtUtil.getUserId(token.substring(7));

		List<ResponseStreamingAnimalDto> animalDtoList = animalService.findAnimals(userId);

		return ResponseEntity.ok(animalDtoList);
	}

	@PostMapping("/")
	public ResponseEntity<ResponseDto> startStreaming(@RequestHeader("Authorization") String token, @RequestBody
		RequestStreamingDto requestStreamingDto){
		Long loginUserId = jwtUtil.getUserId(token.substring(7));

		ResponseDto responseDto = streamingService.startStreaming(loginUserId, requestStreamingDto);
		return ResponseEntity.ok(responseDto);
	}

}
