package com.e202.dogcatdang.mypage.service;

import com.e202.dogcatdang.db.entity.Animal;
import com.e202.dogcatdang.db.entity.AnimalLike;
import com.e202.dogcatdang.db.repository.AnimalLikeRepository;
import com.e202.dogcatdang.db.repository.AnimalRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

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
    public List<Animal> getLikedAnimalsByUser(Long userId) {
        List<AnimalLike> likes = animalLikeRepository.findByUserId(userId);
        return likes.stream().map(AnimalLike::getAnimal).collect(Collectors.toList());
    }

    public List<Animal> getProtectedAnimalsForShelter(Long userId) {
        return animalRepository.findByUserIdAndState(userId, Animal.State.보호중);
    }
    // 동물 ID로 동물 상세 정보 조회
    public Animal findAnimalById(Long animalId) {
        return animalRepository.findById(animalId)
                .orElseThrow(() -> new EntityNotFoundException("Animal not found with id: " + animalId));
    }
}