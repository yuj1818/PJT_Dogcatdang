package com.e202.dogcatdang.lostanimal.service;

import java.io.IOException;
import java.util.Comparator;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.e202.dogcatdang.db.entity.Animal;
import com.e202.dogcatdang.db.entity.LostAnimal;
import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.db.repository.LostAnimalRepository;
import com.e202.dogcatdang.db.repository.UserRepository;
import com.e202.dogcatdang.lostanimal.dto.RequestLostAnimalDto;
import com.e202.dogcatdang.lostanimal.dto.ResponseLostAnimalDto;
import com.e202.dogcatdang.lostanimal.dto.ResponseLostAnimalListDto;
import com.e202.dogcatdang.lostanimal.dto.ResponseLostAnimalPageDto;
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
		LostAnimal lostAnimal = lostAnimalRepository.findByIdWithUser(lostAnimalId)
			.orElseThrow(() -> new NoSuchElementException("해당 Id의 동물이 없습니다."));
		return new ResponseLostAnimalDto(lostAnimal);
	}

	/*	전체 동물 데이터(리스트) 조회
	1. DB에 저장된 전체 동물 리스트(entity 저장)를 가져온다.
	2. DtoList에 가져온 전체 동물 리스트의 값들을 Dto로 변환해 저장한다.
*/
	@Override
	@Transactional
	public ResponseLostAnimalPageDto findAll(int page, int recordSize) {
		// 1. 현재 페이지와 한 페이지당 보여줄 동물 데이터의 개수를 기반으로 PageRequest 객체 생성
		PageRequest pageRequest = PageRequest.of(page - 1, recordSize);

		// 2. AnimalRepository를 사용하여 상태가 '실종'인 동물 데이터 조회
		List<LostAnimal> lostAnimals = lostAnimalRepository.findByState(LostAnimal.State.실종);

		// 3. 페이징 처리를 위해 서브리스트를 구함
		lostAnimals.sort(Comparator.comparing(LostAnimal::getLostAnimalId).reversed());
		int startIdx = pageRequest.getPageNumber() * pageRequest.getPageSize();
		int endIdx = Math.min((startIdx + pageRequest.getPageSize()), lostAnimals.size());
		List<LostAnimal> pagedLostAnimals = lostAnimals.subList(startIdx, endIdx);

		// 4. 페이징 정보 : 전체 페이지, 전체 요소, 현재 페이지, 다음 페이지와 이전 페이지 여부
		int totalPages = (int) Math.ceil((double) lostAnimals .size() / pageRequest.getPageSize());
		long totalElements = lostAnimals .size();
		boolean hasNextPage = page < totalPages;
		boolean hasPreviousPage = page > 1;

		// 5. Animal 엔터티를 ResponseAnimalListDto로 변환하여 리스트에 담기
		List<ResponseLostAnimalListDto> animalDtoList = pagedLostAnimals.stream()
			.map(animal -> ResponseLostAnimalListDto.builder()
				.animal(animal)
				.build())
			.collect(Collectors.toList());

		// AnimalService의 findAll 메서드 내에서 ResponseAnimalPageDto 생성 부분

		return ResponseLostAnimalPageDto.builder()
			.lostAnimalDtoList(animalDtoList)
			.totalPages(totalPages)
			.currentPage(page)
			.totalElements(totalElements)
			.hasNextPage(hasNextPage)
			.hasPreviousPage(hasPreviousPage)
			.build();
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
			request.getFeature(),request.getState(), request.getImgUrl());

		return animal;
	}
}
