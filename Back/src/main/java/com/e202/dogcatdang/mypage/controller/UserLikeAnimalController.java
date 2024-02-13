package com.e202.dogcatdang.mypage.controller;


import com.e202.dogcatdang.board.dto.ResponseBoardSummaryDto;
import com.e202.dogcatdang.board.service.BoardServiceImpl;
import com.e202.dogcatdang.db.entity.Animal;
import com.e202.dogcatdang.mypage.service.MyPageService;
import com.e202.dogcatdang.user.jwt.JWTUtil;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    @GetMapping("/liked-animals/{userId}")
    public ResponseEntity<List<Animal>> getLikedAnimalsByUserId(@PathVariable Long userId) {
        System.out.println("liked-animals");

        // userId를 사용하여 관심 동물 조회 로직 수행
        List<Animal> likedAnimals = myPageService.getLikedAnimalsByUser(userId);

        // 조회된 동물들을 ResponseEntity로 반환
        return ResponseEntity.ok(likedAnimals);
    }

    //기관의 보호중인 동물 불러오기
    @GetMapping("/protected-animals/{userId}")
    public ResponseEntity<List<Animal>> getProtectedAnimalsForUser(@PathVariable Long userId) {
        System.out.println("protected-animals");

        // userId를 사용하여 보호동물 조회 로직 수행
        List<Animal> protectedAnimals = myPageService.getProtectedAnimalsForShelter(userId);

        // 조회된 보호동물들을 ResponseEntity로 반환
        return ResponseEntity.ok(protectedAnimals);
    }


    //상세정보 가져오기
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
    @GetMapping("/posts/{userId}")
    public ResponseEntity<List<ResponseBoardSummaryDto>> getPostsForUser(@PathVariable Long userId) {
        System.out.println("/posts");

        // userId를 사용하여 게시물 조회 로직 수행
        List<ResponseBoardSummaryDto> posts = boardService.findAllByLoginUser(userId);

        // 조회된 게시물들을 ResponseEntity로 반환
        return ResponseEntity.ok(posts);
    }
}
    //유저의 관심동물 불러오기
//    @GetMapping("/liked-animals")
//    public ResponseEntity<List<Animal>> getLikedAnimals(@RequestHeader("Authorization") String token) {
//        System.out.println("liked-animals");
//        if (!token.startsWith("Bearer ")) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
//        String jwt = token.substring(7);
//        Long userId;
//        try {
//            userId = jwtUtil.getUserId(jwt);
//        } catch (Exception e) {
//            // 예외 처리, 예를 들어 파싱 실패, 유효하지 않은 토큰 등
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
//        List<Animal> likedAnimals = myPageService.getLikedAnimalsByUser(userId);
//        return ResponseEntity.ok(likedAnimals);
//    }

    //기관회원 마이페이지 (보호중일 동물 리스트 가져오기)
//    @GetMapping("/protected-animals")
//    public ResponseEntity<List<Animal>> getProtectedAnimals(@RequestHeader("Authorization") String token) {
//        System.out.println("protected-animals");
//        if (!token.startsWith("Bearer ")) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
//        String jwt = token.substring(7);
//        Long userId = jwtUtil.getUserId(jwt); // 예외 처리 생략
//
//        List<Animal> protectedAnimals = myPageService.getProtectedAnimalsForShelter(userId);
//        return ResponseEntity.ok(protectedAnimals);
//    }
    // 특정 동물의 상세 정보 조회
//    @GetMapping("/{animalId}")
//    public ResponseEntity<Animal> getAnimalDetail(@PathVariable("animalId") Long animalId) {
//        System.out.println("상세조회 동물");
//        try {
//            Animal animal = myPageService.findAnimalById(animalId);
//            return ResponseEntity.ok(animal);
//        } catch (EntityNotFoundException e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//        }
//    }

//    @GetMapping("/posts")
//    public ResponseEntity<List<ResponseBoardSummaryDto>> getPosts(@RequestHeader("Authorization") String token){
//        System.out.println("/posts");
//        if (!token.startsWith("Bearer ")) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
//        String jwt = token.substring(7);
//        Long userId = jwtUtil.getUserId(jwt); // 예외 처리 생략
//
//        System.out.println("userId : " + userId);
//
//
//
//        List<ResponseBoardSummaryDto> posts = boardService.findAllByLoginUser(userId);
//        return ResponseEntity.ok(posts);
//    }
//}
