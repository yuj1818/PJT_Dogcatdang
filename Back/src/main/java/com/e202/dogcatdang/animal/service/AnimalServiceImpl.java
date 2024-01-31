package com.e202.dogcatdang.animal.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.e202.dogcatdang.animal.dto.RequestAnimalDto;
import com.e202.dogcatdang.animal.dto.ResponseAnimalDto;
import com.e202.dogcatdang.animal.dto.ResponseAnimalListDto;
import com.e202.dogcatdang.animal.dto.ResponseSavedIdDto;
import com.e202.dogcatdang.db.entity.Animal;
import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.db.repository.AnimalRepository;
import com.e202.dogcatdang.db.repository.UserRepository;
import com.e202.dogcatdang.user.jwt.JWTUtil;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AnimalServiceImpl implements AnimalService{

	private JWTUtil jwtUtil;

	private final AnimalRepository animalRepository;
	private final UserRepository userRepository;

	/*	동물 데이터 등록(작성)
		1. Client에게 받은 RequestDto를 Entity로 변환하여 DB에 저장한다.
		2. animalId 값을 반환한다
	*/
	@Override
	public ResponseSavedIdDto save(RequestAnimalDto requestAnimalDto, String token) throws IOException {
		// JWT 토큰에서 userId 추출
		Long userId = jwtUtil.getUserId(token.substring(7));

		User user = userRepository.findById(userId)
			.orElseThrow(() -> new NoSuchElementException("해당 Id의 회원이 없습니다"));

		Animal animal = requestAnimalDto.toEntity(user);
		Long savedId = animalRepository.save(animal).getAnimalId();
		return new ResponseSavedIdDto(savedId);
	}


	/*	전체 동물 데이터(리스트) 조회
		1. DB에 저장된 전체 동물 리스트(entity 저장)를 가져온다.
		2. DtoList에 가져온 전체 동물 리스트의 값들을 Dto로 변환해 저장한다.
	*/
	@Override
	@Transactional
	public Page<ResponseAnimalListDto> findAll(int page, int recordSize) {
		// 1. 현재 페이지와 한 페이지당 보여줄 동물 데이터의 개수를 기반으로 PageRequest 객체 생성
		PageRequest pageRequest = PageRequest.of(page - 1, recordSize);

		// 2. AnimalRepository를 사용하여 페이징된 동물 데이터 조회
		Page<Animal> animalPage = animalRepository.findAll(pageRequest);

		// 3. 전체 페이지 수 계산 (5의 배수로 맞춤) -> 아래에 method 구현되어 있다
		int totalPages = calculateTotalPages(animalPage.getTotalPages());
		int currentPage = animalPage.getNumber() + 1; // 현재 페이지 번호

		// 4. Animal 엔터티를 ResponseAnimalListDto로 변환하여 리스트에 담기
		List<ResponseAnimalListDto> animalDtoList = animalPage.getContent().stream()
			.map(animal -> ResponseAnimalListDto.builder()
				.animal(animal)
				.build())
			.collect(Collectors.toList());

		// 5. 변환된 데이터와 페이징 정보를 이용하여 새로운 Page 객체 생성
		return new PageImpl<>(animalDtoList, PageRequest.of(currentPage - 1, recordSize), totalPages);
	}

	// 전체 페이지 수 계산 메서드
	private int calculateTotalPages(int totalPages) {
		return totalPages % 5 != 0 ? (totalPages / 5) * 5 + 5 : totalPages;
	}


	/*	특정한 동물 데이터 상세 조회
		1. animalId를 이용하여 DB에서 해당하는 동물 정보(Entity)를 가져온다.
		2. Entity -> DTO로 바꿔서 반환한다.
	*/
	@Override
	@Transactional
	public ResponseAnimalDto findById(Long animalId) {
		Animal animal = animalRepository.findById(animalId)
			.orElseThrow(() -> new NoSuchElementException("해당 Id의 동물이 없습니다."));
		return new ResponseAnimalDto(animal);
	}

	/*특정한 동물 데이터 수정*/
	@Override
	@Transactional
	public Animal update(Long animalId, RequestAnimalDto request) throws IOException {
		// 특정 동물 데이터 조회
		Animal animal = animalRepository.findById(animalId)
			.orElseThrow(() -> new IllegalArgumentException("해당 Id의 동물을 찾을 수 없습니다."));

		// rescueLocation 조합
		String rescueLocation = request.getSelectedCity() + " " + request.getSelectedDistrict() + " " +
								(request.getDetailInfo() != null ? request.getDetailInfo() : "");

		animal.update(request.getAnimalType(), request.getBreed(), request.getAge(), request.getWeight(),
			request.getRescueDate(), rescueLocation, request.getIsNeuter(), request.getGender(),
			request.getFeature(),request.getState(), request.getImgName(), request.getImgUrl());

		return animal;
	}

}

