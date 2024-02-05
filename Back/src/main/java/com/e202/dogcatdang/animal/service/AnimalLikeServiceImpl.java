package com.e202.dogcatdang.animal.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.e202.dogcatdang.db.entity.Animal;
import com.e202.dogcatdang.db.entity.AnimalLike;
import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.db.repository.AnimalLikeRepository;
import com.e202.dogcatdang.db.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AnimalLikeServiceImpl implements AnimalLikeService{

	private final AnimalLikeRepository animalLikeRepository;
	private final UserRepository userRepository;

	// like 등록
	// 해당 user와 animal로 animallike 생성 후 저장
	public void likeAnimal(Long userId, Animal animal) {
		// userId로 사용자 엔티티 찾아오기
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new EntityNotFoundException(userId + "를 가진 사용자가 없습니다."));

		if (!isAnimalLikedByUser(animal, user)) {
			AnimalLike animalLike = AnimalLike.builder()
				.user(user)
				.animal(animal)
				.build();
			animalLikeRepository.save(animalLike);
		} else {
			System.out.println("이미 좋아요를 등록한 동물입니다."); // 임시로 print
		}

	}

	// like 취소
	public void unlikeAnimal(Long userId, Animal animal) {
		// userId로 사용자 엔티티 찾아오기
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new EntityNotFoundException(userId + "를 가진 사용자가 없습니다."));
		
		AnimalLike animalLike = animalLikeRepository.findByUserAndAnimal(user, animal);
		// 해당 user와 animal을 가진 animallike가 있다면 삭제
		if (animalLike != null) {
			animalLikeRepository.delete(animalLike);
		}
	}

	// user가 animal에 like를 했는지 boolean 값으로 확인
	@Override
	public boolean isAnimalLikedByUser(Animal animal, User user) {
		return animalLikeRepository.existsByAnimalAndUser(animal, user);
	}

	// 현재 user가 like 한 동물 목록 확인
	public List<Animal> getLikedAnimalsByUser(User user) {
		List<AnimalLike> animalLikes = animalLikeRepository.findByUser(user);
		return animalLikes.stream().map(AnimalLike::getAnimal).collect(Collectors.toList());
	}
}
