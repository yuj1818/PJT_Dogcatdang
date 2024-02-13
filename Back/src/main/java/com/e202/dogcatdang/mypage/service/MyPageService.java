package com.e202.dogcatdang.mypage.service;

import com.e202.dogcatdang.db.entity.Animal;
import com.e202.dogcatdang.db.entity.AnimalLike;
import com.e202.dogcatdang.db.repository.AnimalLikeRepository;
import com.e202.dogcatdang.db.repository.AnimalRepository;
import com.e202.dogcatdang.mypage.dto.MypageAnimalDto;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service

public class MyPageService {


    private final AnimalLikeRepository animalLikeRepository;
    private final AnimalRepository animalRepository;



    public MyPageService(AnimalLikeRepository animalLikeRepository, AnimalRepository animalRepository) {
        this.animalLikeRepository = animalLikeRepository;
        this.animalRepository = animalRepository;
    }

    // 사용자 ID를 받아 해당 사용자가 좋아요 누른 동물 목록을 반환
//    @Transactional
//    public List<Animal> getLikedAnimalsByUser(Long userId) {
//        List<AnimalLike> likes = animalLikeRepository.findByUserId(userId);
//        return likes.stream()
//                .map(AnimalLike::getAnimal)
//                .collect(Collectors.toList());
//    }

    @Transactional
    public List<MypageAnimalDto> getLikedAnimalsByUser(Long userId) {
        List<AnimalLike> likes = animalLikeRepository.findByUserId(userId);
        return likes.stream()
                .map(AnimalLike::getAnimal)
                .map(this::convertToAnimalDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<MypageAnimalDto> getProtectedAnimalsForShelter(Long userId) {
        List<Animal> animals = animalRepository.findByUserIdAndState(userId, Animal.State.보호중);
        return animals.stream()
                .map(this::convertToAnimalDTO) // 변환 메서드를 사용합니다.
                .collect(Collectors.toList());
    }

    // 동물 ID로 동물 상세 정보 조회
    @Transactional
    public Animal findAnimalById(Long animalId) {
        return animalRepository.findById(animalId)
                .orElseThrow(() -> new EntityNotFoundException("Animal not found with id: " + animalId));
    }


    private MypageAnimalDto convertToAnimalDTO(Animal animal) {
        return new MypageAnimalDto(
                animal.getAnimalId(),
                animal.getAnimalType(),
                animal.getBreed(),
                animal.getAge(),
                animal.getGender(),
                animal.getIsNeuter(),
                animal.getState().toString(),
                animal.getRescueDate(),
                animal.getRescueLocation(),
                animal.getImgUrl()
        );
    }
}