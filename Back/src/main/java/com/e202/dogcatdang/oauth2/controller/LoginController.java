package com.e202.dogcatdang.oauth2.controller;

import com.amazonaws.services.ec2.model.UserData;
import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.db.repository.UserRepository;
import com.e202.dogcatdang.oauth2.dto.CustomOAuth2User;

import com.e202.dogcatdang.oauth2.service.CustomOAuth2UserService;

import com.e202.dogcatdang.user.Service.JoinService;
import com.e202.dogcatdang.user.dto.JoinDTO;
import com.e202.dogcatdang.user.jwt.JWTUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/oauth2")

public class LoginController {




    private final UserRepository userRepository;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final JoinService joinService;
    private final JWTUtil jwtUtil;


    public LoginController(UserRepository userRepository, CustomOAuth2UserService customOAuth2UserService, JoinService joinService, JWTUtil jwtUtil) {
        this.userRepository = userRepository;
        this.customOAuth2UserService = customOAuth2UserService;
        this.joinService = joinService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/token")
    public ResponseEntity<?> getToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        System.out.println("getToken하러 api");
        if (authentication == null || !(authentication.getPrincipal() instanceof CustomOAuth2User)) {
            // 인증 정보가 없거나 예상한 타입이 아닌 경우
            System.out.println("Authentication 정보가 없습니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication 정보가 없습니다.");
        }

        String email = ((CustomOAuth2User) authentication.getPrincipal()).getEmail();
        System.out.println("getPrincipal 성공, email: " + email);

        // 사용자 정보 조회 및 JWT 토큰 생성 로직
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (!userOptional.isPresent()) {
            // 이메일에 해당하는 사용자가 없는 경우
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with email: " + email);
        }

        User user = userOptional.get();
        String token = jwtUtil.createJwt(user.getId(), user.getUsername(), user.getRole(), user.getNickname(), 86400000L); // 1일 만료

        return ResponseEntity.ok().body(Map.of("token", token));
    }

//    @GetMapping("/token")
//    public ResponseEntity<?> getToken(Authentication authentication) {
//
//        System.out.println("/api/oauth2/token 들오나?");
//        String email = "";
//        Object principal = authentication.getPrincipal();
//        if (principal instanceof CustomOAuth2User) {
//            email = ((CustomOAuth2User) principal).getEmail();
//        }
//
//        System.out.println("getprincipal 성공");
////         사용자 정보 조회 및 JWT 토큰 생성 로직
////         이메일을 기반으로 사용자 정보 조회 및 JWT 토큰 생성
//        Optional<User> userOptional = userRepository.findByEmail(email);
//        User user = userOptional.orElseThrow(() -> new UsernameNotFoundException("User not found with email: " ));
//        String token = jwtUtil.createJwt(user.getId(), user.getUsername(), user.getRole(), user.getNickname(), 86400000L); // 1일 만료
//
//        return ResponseEntity.ok().body(Map.of("token", token));
//    }

    @PostMapping("/join")
    public ResponseEntity<String> joinUser(@RequestBody JoinDTO joinDTO) {
        joinService.joinUser(joinDTO);
        return ResponseEntity.ok("User joined successfully");
    }
}
