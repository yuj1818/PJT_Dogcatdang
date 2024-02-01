package com.e202.dogcatdang.lostanimal.service;

import java.io.IOException;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;



import com.e202.dogcatdang.db.entity.LostAnimal;
import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.db.repository.LostAnimalRepository;
import com.e202.dogcatdang.db.repository.UserRepository;
import com.e202.dogcatdang.lostanimal.dto.RequestLostAnimalDto;
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
}
