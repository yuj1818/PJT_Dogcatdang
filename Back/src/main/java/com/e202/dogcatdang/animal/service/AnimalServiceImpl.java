package com.e202.dogcatdang.animal.service;

import java.io.IOException;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.e202.dogcatdang.animal.dto.RequestAnimalDto;
import com.e202.dogcatdang.animal.dto.RequestAnimalSearchDto;
import com.e202.dogcatdang.animal.dto.RequestShelterSearchDto;
import com.e202.dogcatdang.animal.dto.ResponseAnimalDto;
import com.e202.dogcatdang.animal.dto.ResponseAnimalListDto;
import com.e202.dogcatdang.animal.dto.ResponseAnimalPageDto;
import com.e202.dogcatdang.animal.dto.ResponseSavedIdDto;
import com.e202.dogcatdang.animal.dto.ResponseShelterAnimalCountDto;
import com.e202.dogcatdang.animal.dto.ResponseShelterAnimalDto;
import com.e202.dogcatdang.animal.dto.ResponseShelterAnimalPageDto;
import com.e202.dogcatdang.db.entity.Animal;
import com.e202.dogcatdang.db.entity.Reservation;
import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.db.repository.AnimalLikeRepository;
import com.e202.dogcatdang.db.repository.AnimalRepository;
import com.e202.dogcatdang.db.repository.ReservationRepository;
import com.e202.dogcatdang.db.repository.UserRepository;
import com.e202.dogcatdang.streaming.dto.ResponseStreamingAnimalDto;
import com.e202.dogcatdang.user.jwt.JWTUtil;

import jakarta.persistence.criteria.Predicate;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AnimalServiceImpl implements AnimalService {

	private JWTUtil jwtUtil;

	private final AnimalRepository animalRepository;
	private final UserRepository userRepository;
	private final AnimalLikeRepository animalLikeRepository;
	private final ReservationRepository reservationRepository;

	private final AnimalLikeService animalLikeService;


	/*	동물 데이터 등록(작성)
		1. Client에게 받은 RequestDto를 Entity로 변환하여 DB에 저장한다.
		2. animalId 값을 반환한다
	*/
	@Transactional
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

	/*	특정한 동물 데이터 상세 조회
		1. animalId를 이용하여 DB에서 해당하는 동물 정보(Entity)를 가져온다.
		2. Entity -> DTO로 바꿔서 반환한다.
	*/
	@Transactional
	@Override
	public ResponseAnimalDto findById(Long animalId, Long userId) {
		Animal animal = animalRepository.findByIdWithUser(animalId)
			.orElseThrow(() -> new NoSuchElementException("해당 Id의 동물이 없습니다."));

		User user = userRepository.findById(userId).orElseThrow(null);
		int adoptionApplicantCount = getAdoptions(animal);
		boolean isLike = animalLikeService.isAnimalLikedByUser(animal, user);
		return new ResponseAnimalDto(animal, adoptionApplicantCount, isLike);
	}

	/*	전체 동물 데이터(리스트) 조회
		1. DB에 저장된 전체 동물 리스트(entity 저장)를 가져온다.
		2. DtoList에 가져온 전체 동물 리스트의 값들을 Dto로 변환해 저장한다.
	*/
	@Transactional
	@Override
	public ResponseAnimalPageDto findAllAnimals(int page, int recordSize, String token) {
		// 1. 현재 페이지와 한 페이지당 보여줄 동물 데이터의 개수를 기반으로 PageRequest 객체 생성
		PageRequest pageRequest = PageRequest.of(page - 1, recordSize);

		// 2. AnimalRepository를 사용하여 상태가 '보호중'인 동물 데이터 조회
		List<Animal> protectedAnimals = animalRepository.findByState(Animal.State.보호중);

		// 3. 페이징 처리를 위해 서브리스트를 구함
		// -> page 객체를 안 쓴 이유, 위의 '보호중' 동물을 찾을 때 jpa 기본 제공 메서드 쓰기 위해서
		// 	sublist는 list의 부분을 반환하며 정렬 순서를 보장하지 않기에 정렬을 따로 해줘야 한다
		protectedAnimals.sort(Comparator.comparing(Animal::getAnimalId).reversed());

		int startIdx = pageRequest.getPageNumber() * pageRequest.getPageSize();
		int endIdx = Math.min((startIdx + pageRequest.getPageSize()), protectedAnimals.size());
		List<Animal> pagedProtectedAnimals = protectedAnimals.subList(startIdx, endIdx);

		// 4. 페이징 정보 : 전체 페이지, 전체 요소, 현재 페이지, 다음 페이지와 이전 페이지 여부
		int totalPages = (int) Math.ceil((double) protectedAnimals.size() / pageRequest.getPageSize());
		long totalElements = protectedAnimals.size();
		boolean hasNextPage = endIdx < totalElements;
		boolean hasPreviousPage = page > 1;

		// 5. Animal 엔터티를 ResponseAnimalListDto로 변환하여 리스트에 담기
		// 현재 로그인한 User 정보를 담은 객체 찾은 후, isLike 판별에 사용
		Long userId = jwtUtil.getUserId(token.substring(7));

		User user = userRepository.findById(userId)
			.orElseThrow(() -> new NoSuchElementException("해당 Id의 회원이 없습니다"));

		List<ResponseAnimalListDto> animalDtoList = pagedProtectedAnimals.stream()
			.map(animal -> {
				int adoptionApplicantCount = getAdoptions(animal);
				boolean isLike = animalLikeRepository.existsByAnimalAndUser(animal, user);
				return ResponseAnimalListDto.builder()
				.animal(animal)
					.adoptionApplicantCount(adoptionApplicantCount)
					.isLike(isLike)
				.build();
			})
			.collect(Collectors.toList()); // 스트림 결과를 리스트로 만들기

		// 6. AnimalService의 findAll 메서드 내에서 ResponseAnimalPageDto 생성 부분

		return ResponseAnimalPageDto.builder()
			.animalDtoList(animalDtoList)
			.totalPages(totalPages)
			.currentPage(page)
			.totalElements(totalElements)
			.hasNextPage(hasNextPage)
			.hasPreviousPage(hasPreviousPage)
			.build();
	}

	/*특정한 동물 데이터 수정*/
	@Transactional
	@Override
	public Animal update(Long animalId, RequestAnimalDto request) throws IOException {
		// 특정 동물 데이터 조회
		Animal animal = getAnimalById(animalId);

		// rescueLocation 조합
		String rescueLocation = request.getSelectedCity() + " " + request.getSelectedDistrict() + " " +
								(request.getDetailInfo() != null ? request.getDetailInfo() : "");

		animal.update(request.getAnimalType(), request.getBreed(), request.getAge(), request.getWeight(),
			request.getRescueDate(), rescueLocation, request.getIsNeuter(), request.getGender(),
			request.getFeature(),request.getState(), request.getImgUrl(), request.getCode());

		return animal;
	}

	// JPA 기본 제공 findById가 dto를 반환하도록 커스텀(override)해 사용하기에
	// 같은 기능을 하는 새 method 생성
	@Override
	public Animal getAnimalById(Long animalId) {
		Optional<Animal> optionalAnimal = animalRepository.findById(animalId);
		return optionalAnimal.orElse(null); // null을 반환하거나 원하는 예외를 던질 수 있습니다.
	}

	// 방송 개설 단계에서 방송에 출연할 동물들을 고르기 위한 동물 리스트를 반환하는 기능
	// streamingcontroller에서 사용됨
	@Override
	@Transactional
	public List<ResponseStreamingAnimalDto> findAnimals(Long userId) {
		List<Animal> animals = animalRepository.findByUserIdAndState(userId, Animal.State.보호중);
		List<ResponseStreamingAnimalDto> animalDtoList = new ArrayList<>();

		for (Animal animal : animals) {
			ResponseStreamingAnimalDto streamingAnimalDto = ResponseStreamingAnimalDto.builder()
				.animal(animal)
				.build();

			animalDtoList.add(streamingAnimalDto);
		}

		return animalDtoList;
	}

	// 동물에게 들어온 방문 예약 중 승인된 것들 세기
	public int getAdoptions(Animal animal) {
		Long animalId = animal.getAnimalId();

		// animalId가 일치하고, 승인 상태의 방문 예약 정보들을 모두 조회하여 리스트 형태로 반환
		List<Reservation> reservations = reservationRepository.findByAnimal_AnimalIdAndState(animalId, Reservation.State.승인);

		// 예약 개수 반환
		return reservations.size();
	}

	// 보호 동물 검색 페이징 처리
	@Transactional
	@Override
	public ResponseAnimalPageDto searchAnimals(int page, int recordSize, RequestAnimalSearchDto searchDto, User user) {
		// 1. 현재 페이지와 한 페이지당 보여줄 동물 데이터의 개수를 기반으로 PageRequest 객체 생성
		PageRequest pageRequest = PageRequest.of(page - 1, recordSize, Sort.by(Sort.Direction.DESC, "animalId"));

		// 2. 검색 조건에 따라 동물 데이터를 조회
		Specification<Animal> specification = createSpecification(searchDto);

		// 3. AnimalRepository를 사용하여 검색된 동물 데이터를 페이징하여 가져옴
		Page<Animal> animalPage = animalRepository.findAll(specification, pageRequest);

		// 4. 페이징 정보 가져오기
		int totalPages = animalPage.getTotalPages();
		long totalElements = animalPage.getTotalElements();
		boolean hasNextPage = animalPage.hasNext();
		boolean hasPreviousPage = animalPage.hasPrevious();

		// 5. 페이징된 동물 데이터를 ResponseAnimalListDto로 변환하여 리스트에 담기
		List<ResponseAnimalListDto> animalDtoList = animalPage.getContent().stream()
			.map(animal -> {
				int adoptionApplicantCount = getAdoptions(animal); // 채택 신청자 수 가져오기
				boolean isLike = animalLikeRepository.existsByAnimalAndUser(animal, user); // 사용자가 해당 동물을 좋아하는지 여부 확인
				return ResponseAnimalListDto.builder()
					.animal(animal)
					.adoptionApplicantCount(adoptionApplicantCount)
					.isLike(isLike)
					.build();
			})
			.collect(Collectors.toList()); // 스트림 결과를 리스트로 만들기

		// 6. ResponseAnimalPageDto 생성
		return ResponseAnimalPageDto.builder()
			.animalDtoList(animalDtoList)
			.totalPages(totalPages)
			.currentPage(page)
			.totalElements(totalElements)
			.hasNextPage(hasNextPage)
			.hasPreviousPage(hasPreviousPage)
			.build();
	}

	// 보호 동물 검색 - 다중 쿼리 이용
	// 검색 조건에 따라 Specification 생성
	private Specification<Animal> createSpecification(RequestAnimalSearchDto searchDto) {
		return (root, query, criteriaBuilder) -> {
			List<Predicate> predicates = new ArrayList<>();

			// State 필드가 '보호중'인 동물만을 찾도록 함
			predicates.add(criteriaBuilder.equal(root.get("state"), Animal.State.보호중));
			// 검색 조건에 따라 Predicate 추가 (And 조건으로 들어감)
			if (searchDto.getAnimalType() != null && !searchDto.getAnimalType().isEmpty()) {
				predicates.add(criteriaBuilder.equal(root.get("animalType"), searchDto.getAnimalType()));
			}

			if (searchDto.getBreed() != null && !searchDto.getBreed().isEmpty()) {
				predicates.add(criteriaBuilder.equal(root.get("breed"), searchDto.getBreed()));
			}

			if (searchDto.getSelectedCity() != null && !searchDto.getSelectedCity().isEmpty()) {
				predicates.add(criteriaBuilder.like(root.get("rescueLocation"), "%" + searchDto.getSelectedCity() + "%"));
			}

			if (searchDto.getSelectedDistrict() != null && !searchDto.getSelectedDistrict().isEmpty()) {
				predicates.add(criteriaBuilder.like(root.get("rescueLocation"), "%" + searchDto.getSelectedDistrict() + "%"));
			}

			if (searchDto.getGender() != null && !searchDto.getGender().isEmpty()) {
				predicates.add(criteriaBuilder.equal(root.get("gender"), searchDto.getGender()));
			}

			if (searchDto.getUserNickname() != null && !searchDto.getUserNickname().isEmpty()) {
				predicates.add(criteriaBuilder.like(root.join("user").get("nickname"), "%" + searchDto.getUserNickname() + "%"));
			}

			return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
		};
	}

	// 기관의 보호동물 관리 숫자 가져오기
	@Transactional
	@Override
	public ResponseShelterAnimalCountDto countAnimals(Long shelterId) {
		// 기관이 등록한 전체 동물 수
		Integer totalAnimals = animalRepository.countByUser_Id(shelterId);

		// 입양 완료된 동물의 수
		Integer adoptedAnimals = animalRepository.countByStateAndUser_Id(Animal.State.입양완료, shelterId);

		// 현재 보호 중인 동물의 수
		Integer protectedAnimals = animalRepository.countByStateAndUser_Id(Animal.State.보호중, shelterId);

		// ResponseShelterAnimalCountDto 객체 생성
		return ResponseShelterAnimalCountDto.builder()
			.totalAnimals(totalAnimals)
			.adoptedAnimals(adoptedAnimals)
			.protectedAnimals(protectedAnimals)
			.build();
	}

	// 기관의 보호 동물 전체 목록 조회
	@Transactional
	@Override
	public ResponseShelterAnimalPageDto findShelterAnimal(int page, int recordSize, Long shelterId) {
		PageRequest pageRequest = PageRequest.of(page - 1, recordSize);

		Page<Animal> animalPage = animalRepository.findByUser_Id(shelterId, pageRequest);

		List<ResponseShelterAnimalDto> animalDtoList = animalPage.getContent().stream()
			.map(ResponseShelterAnimalDto::new)
			.toList();

		return ResponseShelterAnimalPageDto.builder()
			.animalDtoList(animalDtoList)
			.totalPages(animalPage.getTotalPages())
			.currentPage(page)
			.totalElements(animalPage.getTotalElements())
			.hasNextPage(animalPage.hasNext())
			.hasPreviousPage(animalPage.hasPrevious())
			.build();
	}

	// 기관 내 보호동물 검색 페이징 처리
	@Transactional
	@Override
	public ResponseShelterAnimalPageDto searchShelterAnimals(int page, int recordSize,
		RequestShelterSearchDto searchDto, Long shelterId) {
		PageRequest pageRequest = PageRequest.of(page - 1, recordSize);

		Specification<Animal> specification = createShelterSpecification(searchDto, shelterId);

		Page<Animal> animalPage = animalRepository.findAll(specification, pageRequest);

		List<ResponseShelterAnimalDto> animalDtoList = animalPage.getContent().stream()
			.map(ResponseShelterAnimalDto::new)
			.toList();

		return ResponseShelterAnimalPageDto.builder()
			.animalDtoList(animalDtoList)
			.totalPages(animalPage.getTotalPages())
			.currentPage(page)
			.totalElements(animalPage.getTotalElements())
			.hasNextPage(animalPage.hasNext())
			.hasPreviousPage(animalPage.hasPrevious())
			.build();
	}

	// 기관 내 보호 동물 검색
	private Specification<Animal> createShelterSpecification(RequestShelterSearchDto searchDto, Long shelterId) {
		return (root, query, criteriaBuilder) -> {
			List<Predicate> predicates = new ArrayList<>();

			// 현재 로그인한 기관의 동물 내에서만 찾도록 조건 추가
			predicates.add(criteriaBuilder.equal(root.get("user").get("id"), shelterId));

			// 검색 조건: 보호 현황, 품종, 코드
			if (searchDto.getState() != null) {
				predicates.add(criteriaBuilder.equal(root.get("state"), searchDto.getState()));
			}

			if (searchDto.getBreed() != null && !searchDto.getBreed().isEmpty()) {
				predicates.add(criteriaBuilder.equal(root.get("breed"), searchDto.getBreed()));
			}

			if (searchDto.getCode() != null && !searchDto.getCode().isEmpty()) {
				predicates.add(criteriaBuilder.like(root.get("code"), "%" + searchDto.getCode() + "%" ));
			}

			return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
		};
	}
}

