package com.e202.dogcatdang.mypage.service;

import com.e202.dogcatdang.db.entity.Animal;
import com.e202.dogcatdang.db.entity.AnimalLike;
import com.e202.dogcatdang.db.repository.AnimalLikeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserLikeAnimalService {


    private final AnimalLikeRepository animalLikeRepository;

    public UserLikeAnimalService(AnimalLikeRepository animalLikeRepository) {
        this.animalLikeRepository = animalLikeRepository;
    }

    // 사용자 ID를 받아 해당 사용자가 좋아요 누른 동물 목록을 반환
    public List<Animal> getLikedAnimalsByUser(Long userId) {
        List<AnimalLike> likes = animalLikeRepository.findByUserId(userId);
        return likes.stream().map(AnimalLike::getAnimal).collect(Collectors.toList());
    }
}