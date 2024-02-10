//package com.e202.dogcatdang.mypage.service;
//
//import com.e202.dogcatdang.animal.dto.ResponseAnimalDto;
//import com.e202.dogcatdang.db.repository.AnimalLikeRepository;
//
//import java.util.List;
//
//public class MyPageService {
//    private final AnimalLikeRepository animalLikeRepository;
//
//    public MyPageService(AnimalLikeRepository animalLikeRepository) {
//        this.animalLikeRepository = animalLikeRepository;
//    }
//
//    public List<ResponseAnimalDto> findAll(Long userId) {
//        System.out.println("findAll 메서드 안");
//        return animalLikeRepository.findByUserId(userId);
//    }
//}
