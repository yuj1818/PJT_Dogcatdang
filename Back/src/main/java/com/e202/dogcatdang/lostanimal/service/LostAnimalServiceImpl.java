package com.e202.dogcatdang.lostanimal.service;

import java.io.IOException;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.e202.dogcatdang.animal.dto.ResponseAnimalDto;
import com.e202.dogcatdang.db.entity.Animal;
import com.e202.dogcatdang.db.entity.LostAnimal;
import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.db.repository.LostAnimalRepository;
import com.e202.dogcatdang.db.repository.UserRepository;
import com.e202.dogcatdang.lostanimal.dto.RequestLostAnimalDto;
import com.e202.dogcatdang.lostanimal.dto.ResponseLostAnimalDto;
import com.e202.dogcatdang.lostanimal.dto.ResponseSavedIdDto;
import com.e202.dogcatdang.user.jwt.JWTUtil;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class LostAnimalServiceImpl implements LostAnimalService {

	private JWTUtil jwtUtil;

	private final LostAnimalRepository lostAnimalRepository;
	private final UserRepository userRepository;

	/*	실종 동물 데이터 등록(작성)
	1. Client에게 받은 RequestDto를 Entity로 변환하여 DB에 저장한다.
	2. lostAnimalId 값을 반환한다
	*/
	@Override
	public ResponseSavedIdDto save(RequestLostAnimalDto requestLostAnimalDto, String token) throws IOException {
		// JWT 토큰에서 userId 추출
		Long userId = jwtUtil.getUserId(token.substring(7));

		User user = userRepository.findById(userId)
			.orElseThrow(() -> new NoSuchElementException("해당 Id의 회원이 없습니다"));

		LostAnimal lostAnimal = requestLostAnimalDto.toEntity(user);
		Long savedId = lostAnimalRepository.save(lostAnimal).getLostAnimalId();
		return new ResponseSavedIdDto(savedId);
	}

	/*	특정한 실종 동물 데이터 상세 조회
		1. lostAnimalId를 이용하여 DB에서 해당하는 동물 정보(Entity)를 가져온다.
		2. Entity -> DTO로 바꿔서 반환한다.
	*/

	@Override
	public ResponseLostAnimalDto findById(Long lostAnimalId) {
		LostAnimal lostAnimal = lostAnimalRepository.findById(lostAnimalId)
			.orElseThrow(() -> new NoSuchElementException("해당 Id의 동물이 없습니다."));
		return new ResponseLostAnimalDto(lostAnimal);
	}

	/* 특정한 실종 동물 데이터 수정 */
	@Override
	@Transactional
	public LostAnimal update(Long lostAnimalId, RequestLostAnimalDto request) throws IOException {
		// 특정 동물 데이터 조회
		LostAnimal animal = lostAnimalRepository.findById(lostAnimalId)
			.orElseThrow(() -> new IllegalArgumentException("해당 Id의 동물을 찾을 수 없습니다."));

		// rescueLocation 조합
		String lostLocation = request.getSelectedCity() + " " + request.getSelectedDistrict() + " " +
			(request.getDetailInfo() != null ? request.getDetailInfo() : "");

		animal.update(request.getAnimalType(), request.getName(), request.getBreed(), request.getAge(), request.getWeight(),
			request.getLostDate(), lostLocation, request.getGender(),
			request.getFeature(),request.getState(), request.getImgName(), request.getImgUrl());

		return animal;
	}
}
