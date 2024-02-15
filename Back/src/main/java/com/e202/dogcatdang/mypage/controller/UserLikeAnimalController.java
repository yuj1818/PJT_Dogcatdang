package com.e202.dogcatdang.mypage.controller;


import com.e202.dogcatdang.board.dto.ResponseBoardSummaryDto;
import com.e202.dogcatdang.board.service.BoardServiceImpl;
import com.e202.dogcatdang.db.entity.Animal;
import com.e202.dogcatdang.mypage.dto.MypageAnimalDto;
import com.e202.dogcatdang.mypage.service.MyPageService;
import com.e202.dogcatdang.user.jwt.JWTUtil;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users/profiles/details")
public class UserLikeAnimalController {

    private final MyPageService myPageService;


    private final JWTUtil jwtUtil; // JWT 토큰 처리를 위한 컴포넌트 (구현 필요)

    private final BoardServiceImpl boardService;

    public UserLikeAnimalController(MyPageService myPageService, JWTUtil jwtUtil, BoardServiceImpl boardService) {
        this.myPageService = myPageService;
        this.jwtUtil = jwtUtil;
        this.boardService = boardService;
    }

    //유저의 관심동물 불러오기
    @Transactional
    @GetMapping("/liked-animals/{userId}")
    public ResponseEntity<List<MypageAnimalDto>> getLikedAnimalsByUserId(@PathVariable Long userId) {
        System.out.println("liked-animals");

        // userId를 사용하여 관심 동물 조회 로직 수행
        List<MypageAnimalDto> likedAnimals = myPageService.getLikedAnimalsByUser(userId);

        // 조회된 동물들을 ResponseEntity로 반환
        return ResponseEntity.ok(likedAnimals);
    }

    //기관의 보호중인 동물 불러오기
    @Transactional
    @GetMapping("/protected-animals/{userId}")
    public ResponseEntity<List<MypageAnimalDto>> getProtectedAnimalsForUser(@PathVariable Long userId) {
        System.out.println("protected-animals");

        // userId를 사용하여 보호동물 조회 로직 수행
        List<MypageAnimalDto> protectedAnimals = myPageService.getProtectedAnimalsForShelter(userId);

        // 조회된 보호동물들을 ResponseEntity로 반환
        return ResponseEntity.ok(protectedAnimals);
    }


    //상세정보 가져오기
    @Transactional
    @GetMapping("/{animalId}")
    public ResponseEntity<Animal> getAnimalDetail(@PathVariable("animalId") Long animalId) {
        System.out.println("상세조회 동물");
        try {
            Animal animal = myPageService.findAnimalById(animalId);
            return ResponseEntity.ok(animal);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    //근황글 불러오기
    @Transactional
    @GetMapping("/posts/{userId}")
    public ResponseEntity<List<ResponseBoardSummaryDto>> getPostsForUser(@PathVariable Long userId) {
        System.out.println("/posts");

        // userId를 사용하여 게시물 조회 로직 수행
        List<ResponseBoardSummaryDto> posts = boardService.findAllByLoginUser(userId);

        // 조회된 게시물들을 ResponseEntity로 반환
        return ResponseEntity.ok(posts);
    }
}

