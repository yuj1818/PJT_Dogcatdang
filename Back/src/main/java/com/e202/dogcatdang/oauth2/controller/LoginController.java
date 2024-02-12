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
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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
    public ResponseEntity<?> getToken(Authentication authentication) {

        String email = "";
        Object principal = authentication.getPrincipal();
        if (principal instanceof CustomOAuth2User) {
            email = ((CustomOAuth2User) principal).getEmail();
        }

//         사용자 정보 조회 및 JWT 토큰 생성 로직
//         이메일을 기반으로 사용자 정보 조회 및 JWT 토큰 생성
        Optional<User> userOptional = userRepository.findByEmail(email);
        User user = userOptional.orElseThrow(() -> new UsernameNotFoundException("User not found with email: " ));
        String token = jwtUtil.createJwt(user.getId(), user.getUsername(), user.getRole(), user.getNickname(), 86400000L); // 1일 만료

        return ResponseEntity.ok().body(Map.of("token", token));
    }

    @PostMapping("/join")
    public ResponseEntity<String> joinUser(@RequestBody JoinDTO joinDTO) {
        joinService.joinUser(joinDTO);
        return ResponseEntity.ok("User joined successfully");
    }
}
