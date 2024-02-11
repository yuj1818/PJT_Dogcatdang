package com.e202.dogcatdang.mypage.controller;


import com.e202.dogcatdang.db.entity.Animal;
import com.e202.dogcatdang.mypage.service.UserLikeAnimalService;
import com.e202.dogcatdang.user.jwt.JWTUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users/profiles")
public class UserLikeAnimalController {
    @Autowired
    private UserLikeAnimalService userLikeAnimalService;

    @Autowired
    private JWTUtil jwtUtil; // JWT 토큰 처리를 위한 컴포넌트 (구현 필요)

    //유저의 관심동물 불러오기
    @GetMapping("/liked-animals")
    public ResponseEntity<List<Animal>> getLikedAnimals(@RequestHeader("Authorization") String token) {
        if (!token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String jwt = token.substring(7);
        Long userId;
        try {
            userId = jwtUtil.getUserId(jwt);
        } catch (Exception e) {
            // 예외 처리, 예를 들어 파싱 실패, 유효하지 않은 토큰 등
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        List<Animal> likedAnimals = userLikeAnimalService.getLikedAnimalsByUser(userId);
        return ResponseEntity.ok(likedAnimals);
    }
}
