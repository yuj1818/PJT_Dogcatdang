package com.e202.dogcatdang.animal.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.e202.dogcatdang.animal.dto.RequestAnimalDto;
import com.e202.dogcatdang.animal.dto.ResponseAnimalDto;
import com.e202.dogcatdang.animal.dto.ResponseAnimalListDto;
import com.e202.dogcatdang.animal.dto.ResponseAnimalPageDto;
import com.e202.dogcatdang.animal.dto.ResponseSavedIdDto;
import com.e202.dogcatdang.animal.service.AnimalService;
import com.e202.dogcatdang.db.entity.Animal;
import com.e202.dogcatdang.user.Service.CustomUserDetailsService;
import com.e202.dogcatdang.user.jwt.JWTUtil;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/animals")
public class AnimalController {

	private JWTUtil jwtUtil;
	private final AnimalService animalService;



	// 동물 정보 등록
	@PostMapping("")
	public ResponseEntity<ResponseSavedIdDto> registerAnimal(@RequestHeader("Authorization") String token, @RequestBody RequestAnimalDto requestAnimalDto) throws IOException {
		// // 토큰에서 사용자 이름 추출
		// String username = jwtUtil.getUsername(token.substring(7));
		//
		// // 사용자 이름으로 사용자 정보 가져오기
		// UserDetails userDetails = userDetailsService.loadUserByUsername(username);

		// animalType에 맞는 breed를 입력했는지 확인하는 기능
		if (!requestAnimalDto.isValid()) {
			throw new IllegalArgumentException("품종이 동물 타입과 맞지 않습니다.");
		}

		ResponseSavedIdDto responseSavedIdDto = animalService.save(requestAnimalDto, token);
		return ResponseEntity.ok(responseSavedIdDto);
	}

	/* 동물 목록 조회
	*  모든 동물을 페이지로 불러옴
	   1페이지에 최대 8개의 데이터
	*/
	@GetMapping("")
	public ResponseEntity<ResponseAnimalPageDto> findAll(@RequestParam(defaultValue = "1") int page,
		@RequestParam(defaultValue = "8") int recordSize) {
		ResponseAnimalPageDto animalPage = animalService.findAll(page, recordSize);

		// model.addAttribute 대신 ResponseEntity에 데이터를 담아 반환
		return ResponseEntity.ok(animalPage);
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
	public ResponseEntity<Long> update(@PathVariable Long animalId, @RequestHeader("Authorization") String token, @RequestBody RequestAnimalDto requestAnimalDto) throws IOException {
		// 토큰에서 사용자 아이디(pk) 추출
		Long loginUserId = jwtUtil.getUserId(token.substring(7));

		// 수정할 동물 정보 가져오기
		ResponseAnimalDto existingAnimal = animalService.findById(animalId);
		// 수정할 동물의 작성자 아이디(pk) 가져오기
		Long authorId = existingAnimal.getUserId();

		// 현재 로그인한 사용자와 동물의 작성자 아이디 비교
		// 만약 일치하지 않으면 권한 없음 반환
		if (!loginUserId.equals(authorId)) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 403 Forbidden
		}

		Animal animal = animalService.update(animalId, requestAnimalDto);
		return ResponseEntity.ok(animal.getAnimalId());
	}


}
