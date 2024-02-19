package com.e202.dogcatdang.oauth2.controller;

import com.amazonaws.services.ec2.model.UserData;
import com.e202.dogcatdang.db.entity.RefreshToken;
import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.db.repository.UserRepository;
import com.e202.dogcatdang.oauth2.dto.CustomOAuth2User;

import com.e202.dogcatdang.oauth2.service.CustomOAuth2UserService;

import com.e202.dogcatdang.refresh.service.RefreshTokenService;
import com.e202.dogcatdang.user.Service.JoinService;
import com.e202.dogcatdang.user.dto.JoinDTO;
import com.e202.dogcatdang.user.jwt.JWTUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
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

    private final RefreshTokenService refreshTokenService;

    public LoginController(UserRepository userRepository, CustomOAuth2UserService customOAuth2UserService, JoinService joinService, JWTUtil jwtUtil, RefreshTokenService refreshTokenService) {
        this.userRepository = userRepository;
        this.customOAuth2UserService = customOAuth2UserService;
        this.joinService = joinService;
        this.jwtUtil = jwtUtil;
        this.refreshTokenService = refreshTokenService;
    }

    @GetMapping("/token")
    public ResponseEntity<?> getToken(HttpServletRequest request) {

        // 세션에서 인증 정보 가져오기
        SecurityContext securityContext = (SecurityContext) request.getSession().getAttribute("SPRING_SECURITY_CONTEXT");
        Authentication authentication = securityContext.getAuthentication();
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

        String token = jwtUtil.createJwt(user.getId(), user.getUsername(), user.getRole(), user.getNickname(), 7_200_000L); // 1일 만료

        // 리프레시 토큰 생성 및 헤더에 추가
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());
        System.out.println("In OAUTH2.0 // refreshToken 헤더에 추가~");

    // 액세스 토큰과 리프레시 토큰을 응답 바디에 포함시켜 반환
        Map<String, String> tokens = new HashMap<>();
        tokens.put("accessToken", token);
        System.out.println(refreshToken.getToken());
        tokens.put("refreshToken", refreshToken.getToken());

        System.out.println("In OAUTH2.0 // Tokens sent in response body");

        return ResponseEntity.ok(tokens); // Map을 바로 ResponseEntity의 바디로 사용


    }

    @PostMapping("/join")
    public ResponseEntity<String> joinUser(@RequestBody JoinDTO joinDTO) {
        joinService.joinUser(joinDTO);
        return ResponseEntity.ok("User joined successfully");
    }
}
